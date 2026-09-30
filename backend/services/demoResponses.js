/**
 * Demo Mode Responses
 *
 * This service provides realistic mock responses for all AI-powered features
 * when DEMO_MODE=true environment variable is set.
 *
 * Used when:
 * - Gemini API quota is exhausted
 * - Testing without API calls
 * - Demos and presentations
 * - Development without API key
 */

/**
 * Generate realistic ATS scoring results
 * @param {string} resumeText - Resume content (for keyword matching simulation)
 * @param {string} jobDescription - Job description (for matching simulation)
 * @returns {Object} Mock ATS scoring response
 */
exports.mockATSScore = (resumeText = '', jobDescription = '') => {
  // Simulate keyword matching by checking for common tech terms
  const commonKeywords = ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker',
                          'SQL', 'MongoDB', 'API', 'Git', 'Agile', 'TypeScript'];

  const foundKeywords = commonKeywords.filter(keyword =>
    resumeText.toLowerCase().includes(keyword.toLowerCase()) ||
    jobDescription.toLowerCase().includes(keyword.toLowerCase())
  );

  const missingKeywords = commonKeywords.filter(keyword =>
    !resumeText.toLowerCase().includes(keyword.toLowerCase()) &&
    jobDescription.toLowerCase().includes(keyword.toLowerCase())
  ).slice(0, 5);

  // Generate realistic score (70-90 range for good demo)
  const baseScore = 75 + Math.floor(Math.random() * 15);
  const keywordBonus = Math.min(foundKeywords.length * 2, 10);
  const totalScore = Math.min(baseScore + keywordBonus, 95);

  return {
    overallScore: totalScore,
    breakdown: {
      keywordMatching: Math.min(totalScore + 5, 95),
      formatStructure: Math.min(totalScore - 3, 90),
      experienceRelevance: Math.min(totalScore + 2, 92),
      skillsGapAnalysis: Math.min(totalScore - 5, 88)
    },
    strengths: [
      "Strong technical skills demonstrated with concrete examples",
      "Well-structured resume with clear section organization",
      "Quantifiable achievements that showcase impact",
      "Relevant industry experience aligned with job requirements",
      "Professional formatting with consistent styling"
    ],
    improvements: [
      "Consider adding more quantifiable metrics to achievements",
      "Include relevant certifications if available",
      "Strengthen action verbs in experience descriptions",
      "Add keywords from job description naturally throughout",
      "Consider adding a professional summary section"
    ],
    keywords: {
      matched: foundKeywords.slice(0, 8),
      missing: missingKeywords,
      suggestions: [
        "Cloud Computing",
        "Microservices",
        "CI/CD",
        "Testing/QA",
        "Performance Optimization"
      ]
    },
    formatAnalysis: {
      score: 88,
      issues: [
        "Some bullet points could be more concise",
        "Consider using a professional resume template"
      ],
      strengths: [
        "Clear section headings",
        "Consistent formatting throughout",
        "Appropriate length (1-2 pages)"
      ]
    },
    recommendations: [
      "Add 2-3 more relevant keywords from the job description",
      "Quantify your impact: include numbers, percentages, or metrics",
      "Tailor your professional summary to match the role",
      "Highlight your most relevant projects prominently",
      "Consider reorganizing to emphasize skills the employer is seeking"
    ]
  };
};

/**
 * Generate realistic cover letter
 * @param {Object} data - Cover letter generation parameters
 * @returns {Object} Mock cover letter response
 */
exports.mockCoverLetter = (data = {}) => {
  const { companyName = 'ACME Corporation', jobTitle = 'Software Engineer', style = 'professional' } = data;

  const coverLetters = {
    professional: `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobTitle} position at ${companyName}. With a proven track record in software development and a passion for creating innovative solutions, I am confident that my skills and experience align perfectly with your team's needs.

Throughout my career, I have developed expertise in full-stack development, cloud architecture, and agile methodologies. At my current role, I led a team that successfully delivered a scalable microservices platform, resulting in a 40% improvement in system performance and a 25% reduction in operational costs.

What particularly excites me about ${companyName} is your commitment to innovation and technical excellence. Your recent work in AI-powered solutions resonates with my own interests and experience in machine learning applications. I am eager to contribute my expertise while learning from your talented team.

My technical skills include proficiency in JavaScript, Python, React, Node.js, and cloud platforms like AWS and Azure. However, what truly sets me apart is my ability to translate complex technical concepts into actionable solutions that drive business value.

I would welcome the opportunity to discuss how my background, skills, and enthusiasms can contribute to ${companyName}'s continued success. Thank you for considering my application.

Sincerely,
[Your Name]`,

    creative: `Hello ${companyName} Team!

I couldn't contain my excitement when I discovered the ${jobTitle} opening at ${companyName}. This isn't just another job application—it's an opportunity to join a team that's genuinely making waves in the industry.

Here's the thing: I love solving complex problems. Whether it's optimizing algorithms, architecting scalable systems, or collaborating with cross-functional teams, I thrive on challenges that push me to grow. And from everything I've learned about ${companyName}, you're all about those kinds of challenges.

My journey in tech has been anything but ordinary. From building my first app at 15 to leading enterprise-scale projects, I've always believed that great software is born from the intersection of technical excellence and creative thinking. At my current company, I spearheaded an initiative that not only improved our codebase but transformed how our entire team approaches problem-solving.

What draws me to ${companyName}? It's your culture of innovation, your commitment to cutting-edge technology, and frankly, the incredible products you're building. I've been following your recent projects, and I'm genuinely impressed by your approach to [relevant tech/project].

I bring strong technical chops—React, Node.js, Python, cloud architecture—but more importantly, I bring curiosity, adaptability, and a genuine passion for building things that matter.

Let's chat about how I can contribute to your team's success!

Best regards,
[Your Name]`,

    formal: `Dear Members of the ${companyName} Hiring Committee,

I am writing to formally apply for the ${jobTitle} position as advertised. With extensive experience in software engineering and a strong academic background in computer science, I am well-positioned to contribute meaningfully to your organization.

My professional experience encompasses full-stack development, system architecture, and team leadership. In my current position, I have demonstrated the ability to deliver complex projects while maintaining high standards of code quality and system reliability.

Key qualifications include:
• 5+ years of experience in enterprise software development
• Proven expertise in modern web technologies and cloud platforms
• Track record of leading successful project deliveries
• Strong analytical and problem-solving capabilities
• Excellent communication and collaboration skills

${companyName}'s reputation for technical excellence and innovation is well-established in the industry. I am particularly impressed by your commitment to [relevant technology or initiative], which aligns closely with my professional interests and expertise.

I am confident that my technical proficiency, combined with my dedication to continuous improvement and collaborative approach, would make me a valuable addition to your team. I look forward to the opportunity to discuss my qualifications in greater detail.

Thank you for your consideration.

Respectfully,
[Your Name]`
  };

  return {
    coverLetter: coverLetters[style] || coverLetters.professional,
    variations: Object.keys(coverLetters).filter(s => s !== style).map(s => ({
      style: s,
      preview: coverLetters[s].substring(0, 200) + '...'
    })),
    tips: [
      "Customize the opening paragraph to mention something specific about the company",
      "Replace [Your Name] with your actual name before sending",
      "Add specific metrics or achievements from your experience",
      "Proofread carefully for typos and grammatical errors",
      "Keep it concise—aim for 3-4 paragraphs maximum"
    ]
  };
};

/**
 * Generate realistic interview questions
 * @param {Object} data - Question generation parameters
 * @returns {Object} Mock interview questions response
 */
exports.mockInterviewQuestions = (data = {}) => {
  const { role = 'Software Engineer', experienceLevel = 'mid', companyName = 'Tech Company' } = data;

  const questionSets = {
    technical: [
      {
        question: "Explain the difference between REST and GraphQL APIs. When would you choose one over the other?",
        category: "System Design",
        difficulty: "medium",
        expectedAnswer: "REST uses multiple endpoints with standard HTTP methods, while GraphQL uses a single endpoint with flexible queries. Choose REST for simple CRUD operations and public APIs; choose GraphQL when clients need flexible data fetching and you want to avoid over-fetching.",
        evaluationCriteria: ["Understanding of both paradigms", "Awareness of trade-offs", "Practical experience"]
      },
      {
        question: "How would you optimize a slow database query in a production environment?",
        category: "Performance",
        difficulty: "medium",
        expectedAnswer: "Start by analyzing query execution plans, check for missing indexes, review JOIN operations, consider query restructuring, implement caching where appropriate, and monitor query performance metrics.",
        evaluationCriteria: ["Systematic approach", "Knowledge of optimization techniques", "Production awareness"]
      },
      {
        question: "Describe your experience with CI/CD pipelines. What tools have you used?",
        category: "DevOps",
        difficulty: "easy",
        expectedAnswer: "Should mention tools like Jenkins, GitHub Actions, GitLab CI, CircleCI, or Travis CI. Explain pipeline stages: build, test, deploy. Discuss automated testing integration and deployment strategies.",
        evaluationCriteria: ["Hands-on experience", "Understanding of DevOps principles", "Tool proficiency"]
      }
    ],
    behavioral: [
      {
        question: "Tell me about a time when you had to debug a critical production issue under pressure.",
        category: "Problem Solving",
        difficulty: "medium",
        expectedAnswer: "Look for STAR method: Situation (production outage), Task (identify root cause), Action (systematic debugging, stakeholder communication), Result (issue resolved, preventive measures implemented).",
        evaluationCriteria: ["Composure under pressure", "Systematic approach", "Learning from incidents"]
      },
      {
        question: "Describe a situation where you disagreed with a technical decision. How did you handle it?",
        category: "Teamwork",
        difficulty: "medium",
        expectedAnswer: "Should demonstrate: respectful disagreement, data-driven discussion, willingness to listen, ability to compromise or accept team decisions while voicing concerns constructively.",
        evaluationCriteria: ["Communication skills", "Collaboration ability", "Professional maturity"]
      },
      {
        question: "How do you prioritize tasks when working on multiple projects simultaneously?",
        category: "Time Management",
        difficulty: "easy",
        expectedAnswer: "Discuss prioritization frameworks (Eisenhower matrix, MoSCoW method), communication with stakeholders, breaking down large tasks, using project management tools, and setting realistic expectations.",
        evaluationCriteria: ["Organizational skills", "Strategic thinking", "Realistic self-assessment"]
      }
    ],
    roleSpecific: [
      {
        question: `What interests you most about the ${role} position at ${companyName}?`,
        category: "Motivation",
        difficulty: "easy",
        expectedAnswer: "Should mention specific aspects of the role, company mission, technologies used, team culture, or growth opportunities. Shows preparation and genuine interest.",
        evaluationCriteria: ["Research on company", "Alignment with role", "Authentic enthusiasm"]
      },
      {
        question: "Where do you see yourself in 3-5 years in your career?",
        category: "Career Goals",
        difficulty: "easy",
        expectedAnswer: "Should balance ambition with realism, show alignment with the role, indicate desire for growth while being committed to the position.",
        evaluationCriteria: ["Career clarity", "Long-term thinking", "Alignment with position"]
      }
    ]
  };

  const allQuestions = [
    ...questionSets.technical.slice(0, 4),
    ...questionSets.behavioral.slice(0, 3),
    ...questionSets.roleSpecific
  ];

  return {
    questions: allQuestions,
    summary: {
      totalQuestions: allQuestions.length,
      breakdown: {
        technical: questionSets.technical.length,
        behavioral: questionSets.behavioral.length,
        roleSpecific: questionSets.roleSpecific.length
      },
      estimatedDuration: `${allQuestions.length * 5}-${allQuestions.length * 10} minutes`
    },
    preparationTips: [
      "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
      "Prepare specific examples from your past experience",
      "Research the company's tech stack and recent projects",
      "Practice explaining complex technical concepts simply",
      "Prepare thoughtful questions to ask the interviewer"
    ]
  };
};

/**
 * Generate realistic skills gap analysis and course recommendations
 * @param {Object} data - Analysis parameters
 * @returns {Object} Mock learning path response
 */
exports.mockLearningPath = (data = {}) => {
  const { targetRole = 'Full Stack Developer' } = data;

  const presentSkills = ["JavaScript", "React", "Node.js", "SQL", "Git"];
  const missingSkills = ["TypeScript", "Docker", "AWS", "GraphQL", "Testing (Jest/Cypress)"];

  const recommendedCourses = [
    {
      courseId: "demo-typescript",
      title: "TypeScript for JavaScript Developers",
      provider: "Udemy",
      description: "Learn TypeScript fundamentals and type-safe patterns for modern JavaScript codebases.",
      signupLink: "https://www.udemy.com/course/typescript-course/",
      matchedSkills: ["typescript"],
      matchScore: 1
    },
    {
      courseId: "demo-docker",
      title: "Docker Mastery: Complete Toolset",
      provider: "Udemy",
      description: "Hands-on containerization from local dev to production deployment.",
      signupLink: "https://www.udemy.com/course/docker-mastery/",
      matchedSkills: ["docker"],
      matchScore: 1
    },
    {
      courseId: "demo-aws",
      title: "AWS Certified Developer - Associate",
      provider: "A Cloud Guru",
      description: "Core AWS services, serverless architecture, and certification prep.",
      signupLink: "https://acloudguru.com/course/aws-certified-developer-associate",
      matchedSkills: ["aws"],
      matchScore: 1
    },
    {
      courseId: "demo-testing",
      title: "Testing JavaScript Applications",
      provider: "Frontend Masters",
      description: "Unit, integration, and end-to-end testing with Jest and Cypress.",
      signupLink: "https://frontendmasters.com/courses/testing-javascript/",
      matchedSkills: ["testing (jest/cypress)"],
      matchScore: 1
    }
  ];

  const learningPath = [
    {
      phase: "Week 1-2",
      focus: ["TypeScript", "Testing (Jest/Cypress)"],
      courses: [recommendedCourses[0], recommendedCourses[3]],
      goals: ["Demonstrate applied knowledge of: TypeScript, Testing (Jest/Cypress)"]
    },
    {
      phase: "Week 3-4",
      focus: ["Docker", "AWS"],
      courses: [recommendedCourses[1], recommendedCourses[2]],
      goals: ["Demonstrate applied knowledge of: Docker, AWS"]
    },
    {
      phase: "Week 5-6",
      focus: ["GraphQL"],
      courses: [],
      goals: ["Demonstrate applied knowledge of: GraphQL"]
    }
  ];

  return {
    presentSkills,
    missingSkills,
    summary: `Solid foundation for a ${targetRole} role. Closing gaps in TypeScript, Docker, AWS, GraphQL, and automated testing would make the profile fully competitive.`,
    recommendedCourses,
    learningPath
  };
};

/**
 * Generate realistic job post
 * @param {Object} data - Job post parameters
 * @returns {Object} Mock job post response
 */
exports.mockJobPost = (data = {}) => {
  const { jobTitle = 'Software Engineer', companyName = 'Tech Innovators Inc.', experienceLevel = 'Mid-Level' } = data;

  return {
    title: jobTitle,
    company: companyName,
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    experienceLevel: experienceLevel,
    salary: "$120,000 - $160,000/year",
    description: `We are seeking a talented ${jobTitle} to join our growing team at ${companyName}. In this role, you will work on cutting-edge projects that impact millions of users worldwide.

**About Us:**
${companyName} is a leading technology company focused on building innovative solutions that solve real-world problems. Our team of passionate engineers, designers, and product managers collaborate to create products that users love.

**What You'll Do:**
• Design, develop, and maintain scalable web applications
• Collaborate with cross-functional teams to define and ship new features
• Write clean, maintainable, and well-tested code
• Participate in code reviews and contribute to technical discussions
• Mentor junior developers and share knowledge with the team
• Stay current with emerging technologies and industry trends

**What We're Looking For:**
• 3+ years of professional software development experience
• Strong proficiency in JavaScript/TypeScript and modern frameworks (React, Vue, or Angular)
• Experience with backend technologies (Node.js, Python, or Java)
• Familiarity with database systems (SQL and NoSQL)
• Understanding of RESTful APIs and microservices architecture
• Experience with version control (Git) and CI/CD pipelines
• Excellent problem-solving skills and attention to detail
• Strong communication skills and ability to work in a team environment

**Nice to Have:**
• Experience with cloud platforms (AWS, GCP, or Azure)
• Knowledge of containerization (Docker, Kubernetes)
• Contributions to open-source projects
• Experience with Agile/Scrum methodologies
• Understanding of security best practices

**What We Offer:**
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work hours and hybrid work model
• Professional development budget
• Regular team events and company offsites
• State-of-the-art equipment and tools
• Collaborative and inclusive work environment

**Our Values:**
• Innovation: We encourage creative thinking and experimentation
• Collaboration: We believe the best solutions come from diverse perspectives
• Growth: We invest in our people's professional development
• Impact: We focus on building products that make a difference

Join us in shaping the future of technology!`,
    biasAnalysis: {
      score: 92,
      issues: [
        "Consider adding 'or equivalent experience' for degree requirements to be more inclusive"
      ],
      strengths: [
        "Gender-neutral language throughout",
        "Focus on skills and outcomes rather than years of experience",
        "Inclusive benefits and values statement"
      ]
    },
    keywords: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "CI/CD", "Agile"],
    estimatedApplicants: "150-200 applications/month",
    competitiveness: "Moderate - Similar to 40% of market postings"
  };
};

/**
 * Generate realistic resume translation
 * @param {string} targetLanguage - Target language for translation
 * @returns {Object} Mock translation response
 */
exports.mockResumeTranslation = (targetLanguage = 'Spanish') => {
  const translations = {
    Spanish: {
      sections: {
        experience: "Experiencia Profesional",
        education: "Educación",
        skills: "Habilidades",
        summary: "Resumen Profesional"
      },
      sampleText: "Ingeniero de Software con más de 5 años de experiencia en desarrollo full-stack..."
    },
    French: {
      sections: {
        experience: "Expérience Professionnelle",
        education: "Éducation",
        skills: "Compétences",
        summary: "Résumé Professionnel"
      },
      sampleText: "Ingénieur logiciel avec plus de 5 ans d'expérience en développement full-stack..."
    },
    German: {
      sections: {
        experience: "Berufserfahrung",
        education: "Ausbildung",
        skills: "Fähigkeiten",
        summary: "Berufszusammenfassung"
      },
      sampleText: "Software-Ingenieur mit über 5 Jahren Erfahrung in der Full-Stack-Entwicklung..."
    }
  };

  return {
    translatedText: translations[targetLanguage]?.sampleText || "Translation available in demo mode",
    targetLanguage: targetLanguage,
    sections: translations[targetLanguage]?.sections || {},
    quality: "High",
    notes: "Demo mode: This is a sample translation. In production, full resume will be translated."
  };
};

/**
 * Check if demo mode is enabled
 * @returns {boolean} True if demo mode is active
 */
exports.isDemoMode = () => {
  return process.env.DEMO_MODE === 'true' || process.env.DEMO_MODE === '1';
};

/**
 * Get demo mode status message
 * @returns {string} Status message
 */
exports.getDemoModeMessage = () => {
  if (exports.isDemoMode()) {
    return '⚠️ Demo Mode Active: Returning mock AI responses (Gemini API not called)';
  }
  return 'Production Mode: Using real Gemini API';
};
