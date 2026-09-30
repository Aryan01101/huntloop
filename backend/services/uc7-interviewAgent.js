const { GoogleGenerativeAI } = require("@google/generative-ai");
const { isDemoMode, getDemoModeMessage } = require("./demoResponses");
require("dotenv").config();

// Initialize Gemini AI only when not in demo mode and a real key is present
let genAI = null;
if (!isDemoMode() && process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

const DEMO_QUESTIONS = [
  "Tell me about a challenging technical problem you solved recently. Walk me through your approach.",
  "How do you decide when to introduce a new dependency versus building something in-house?",
  "Describe a time you disagreed with a teammate's technical decision. How did you handle it?",
  "How would you design a system that needs to handle a sudden 10x spike in traffic?",
  "What's a mistake you made in a past role, and what did you change afterward?",
];

/**
 * Interview Agent Service using Gemini AI
 * Uses chat.startChat() for conversational memory to adaptively decide next questions
 * based on answer quality and context
 */
class InterviewAgent {
  constructor() {
    if (isDemoMode()) {
      console.log("🎭 InterviewAgent initialized in DEMO MODE - using mock responses");
    } else if (genAI) {
      this.model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    } else {
      console.warn("⚠️ GEMINI_API_KEY not found - set DEMO_MODE=true to use mock responses");
    }
    this.chatSessions = new Map(); // Store active chat sessions by interview ID
  }

  /**
   * Initialize a new interview session with context
   */
  async startInterview(interviewId, candidateProfile) {
    const { position, company, location, age, experience, skills } = candidateProfile;

    if (isDemoMode()) {
      console.log(getDemoModeMessage());
      this.chatSessions.set(interviewId, { demo: true });
      return {
        question: `Thanks for sharing your background for the ${position} role at ${company}. ${DEMO_QUESTIONS[0]}`,
        questionNumber: 1,
        totalQuestions: 5,
      };
    }

    // Create system prompt with interview context
    const systemPrompt = `You are an expert interviewer conducting a mock interview. Here is the candidate profile:
- Position: ${position}
- Company: ${company}
- Location: ${location}
- Age: ${age}
- Years of Experience: ${experience}
- Skills: ${skills.join(", ")}

Your role:
1. Ask relevant, challenging questions based on the candidate's profile and previous answers
2. Adapt the difficulty and focus of questions based on answer quality
3. Ask 5 questions total, covering technical skills, problem-solving, and behavioral aspects
4. After receiving each answer, provide brief acknowledgment before asking the next question
5. Make questions progressively deeper based on the candidate's responses
6. For technical roles, include coding problems or technical scenarios
7. For experienced candidates, ask about leadership and strategic thinking

Start by asking your first question. Be professional, encouraging, and specific to the role.`;

    // Initialize chat session with history
    const chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        {
          role: "model",
          parts: [{ text: "I understand. I will conduct a professional mock interview tailored to this candidate's profile. I'll ask relevant questions and adapt based on their responses. Let me begin with the first question." }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    // Store chat session
    this.chatSessions.set(interviewId, chat);

    // Get first question
    const result = await chat.sendMessage("Please ask the first interview question now.");
    const firstQuestion = result.response.text();

    return {
      question: firstQuestion,
      questionNumber: 1,
      totalQuestions: 5
    };
  }

  /**
   * Process candidate answer and generate next question
   */
  async processAnswer(interviewId, answer, currentQuestionNumber) {
    const chat = this.chatSessions.get(interviewId);

    if (!chat) {
      throw new Error("Interview session not found. Please start a new interview.");
    }

    const totalQuestions = 5;
    const isLastQuestion = currentQuestionNumber >= totalQuestions;

    if (chat.demo) {
      if (isLastQuestion) {
        return {
          acknowledgment: "Thanks — that's a solid answer. That wraps up the interview.",
          isComplete: true,
          questionNumber: currentQuestionNumber,
        };
      }
      const nextQuestionNumber = currentQuestionNumber + 1;
      return {
        response: `Good answer. Next question: ${DEMO_QUESTIONS[nextQuestionNumber - 1]}`,
        questionNumber: nextQuestionNumber,
        totalQuestions,
        isComplete: false,
      };
    }

    if (isLastQuestion) {
      // If this was the last question, just acknowledge the answer
      const result = await chat.sendMessage(answer);
      return {
        acknowledgment: result.response.text(),
        isComplete: true,
        questionNumber: currentQuestionNumber
      };
    }

    // Send answer and request next question
    const nextQuestionNumber = currentQuestionNumber + 1;
    const prompt = `${answer}

[Based on this answer, briefly acknowledge it and then ask question ${nextQuestionNumber} of ${totalQuestions}. Adapt the difficulty and focus based on the quality of this answer. If the answer was strong, dig deeper. If it showed gaps, probe those areas.]`;

    const result = await chat.sendMessage(prompt);
    const response = result.response.text();

    return {
      response: response,
      questionNumber: nextQuestionNumber,
      totalQuestions: totalQuestions,
      isComplete: false
    };
  }

  /**
   * Generate comprehensive feedback and scores for the entire interview
   */
  async generateFeedback(interviewId, conversationHistory, candidateProfile) {
    const { position, experience } = candidateProfile;

    if (isDemoMode()) {
      console.log(getDemoModeMessage());
      this.chatSessions.delete(interviewId);
      return {
        scores: { technical: 82, communication: 78, problemSolving: 80, overall: 80 },
        overallFeedback: `Strong showing for a ${position} candidate with ${experience} years of experience. Answers were structured and specific, with room to go deeper on trade-offs.`,
        strengths: ["Clear communication", "Structured problem-solving approach", "Relevant technical examples"],
        improvements: ["Quantify impact with more metrics", "Discuss trade-offs more explicitly", "Slow down on system design answers"],
        detailedFeedback: [],
      };
    }

    // Create feedback prompt with full conversation context
    const conversationText = conversationHistory
      .filter(turn => turn.role === 'user' || turn.role === 'model')
      .map((turn, index) => {
        if (turn.role === 'model') {
          return `Question ${Math.floor(index / 2) + 1}: ${turn.content}`;
        } else {
          return `Answer: ${turn.content}`;
        }
      })
      .join('\n\n');

    const feedbackPrompt = `You are an expert interview evaluator. Review this mock interview for a ${position} role with ${experience} years of experience.

${conversationText}

Provide a comprehensive evaluation in the following JSON format (respond ONLY with valid JSON, no additional text):
{
  "scores": {
    "technical": <0-100>,
    "communication": <0-100>,
    "problemSolving": <0-100>,
    "overall": <0-100>
  },
  "overallFeedback": "<2-3 sentences summary>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "detailedFeedback": [
    {
      "questionNumber": 1,
      "strengths": ["<specific strength>"],
      "improvements": ["<specific improvement>"],
      "score": <0-100>
    }
  ]
}

Be specific, constructive, and professional. Scores should reflect: technical knowledge, communication clarity, problem-solving approach, and overall interview performance.`;

    const result = await this.model.generateContent(feedbackPrompt);
    const feedbackText = result.response.text();

    // Parse JSON response
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      const feedback = JSON.parse(jsonMatch[0]);

      // Clean up chat session
      this.chatSessions.delete(interviewId);

      return feedback;
    } catch (error) {
      console.error("Error parsing feedback JSON:", error);
      console.error("Raw response:", feedbackText);

      // Return fallback feedback
      return {
        scores: {
          technical: 70,
          communication: 75,
          problemSolving: 70,
          overall: 72
        },
        overallFeedback: "Good overall performance with room for improvement.",
        strengths: ["Engaged with questions", "Provided detailed responses", "Showed enthusiasm"],
        improvements: ["Could provide more specific examples", "Consider structuring answers better", "Expand on technical details"],
        detailedFeedback: []
      };
    }
  }

  /**
   * Clean up chat session
   */
  endSession(interviewId) {
    this.chatSessions.delete(interviewId);
  }
}

// Export singleton instance
module.exports = new InterviewAgent();
