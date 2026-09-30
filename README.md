# Huntloop

AI-powered recruitment platform: resume ATS scoring, AI mock interviews, cover letter generation, cold outreach, skills-gap analysis, and a recruiter toolkit for job posting and interview question generation — built on a 5-agent AI architecture with a full demo mode that runs with zero API cost.

**[Live demo →](#)** _(link added after deploy)_ · Default login: `admin@huntloop.com` / `Admin@123`

---

## What this demonstrates

- **Multi-agent AI design** — five purpose-built agents (resume intelligence, communication, career guidance, recruiter, training) instead of one do-everything prompt, each with its own service module and demo-mode fallback.
- **A real demo-mode architecture** — every AI feature works end-to-end with zero API keys and zero cost, controlled by a single `DEMO_MODE` env var. This isn't a toggle that skips the feature — it returns realistic, schema-correct mock data so the full UI flow is exercisable without live credentials.
- **Security depth for a portfolio-scale app** — JWT auth with role-based access control (applicant/recruiter/trainer/admin), bcrypt hashing, rate limiting, Helmet headers, Mongo injection sanitization, and documented CSRF/security decisions (see [`SECURITY.md`](backend/SECURITY.md), [`CSRF_PROTECTION.md`](backend/CSRF_PROTECTION.md)).
- **Observability** — Winston logging with daily rotation, optional Sentry integration, and an environment validator that refuses to boot on placeholder secrets.
- **A real file pipeline** — resume upload → parsing (PDF/DOCX) → ATS scoring → PDF/DOCX cover-letter and translated-resume export.

## Features

**Applicant**
- Resume ATS Checker — score + category breakdown against a target job description
- Cover Letter Generator — style/length-controlled, with keyword coverage tracking
- Cold Outreach — personalized recruiter emails from resume + job context
- Mock Interview — 5-question adaptive AI interview with scored feedback
- Resume Translator — translate an uploaded resume to another language, export as PDF
- Skills Gap Analysis — present/missing skills, course recommendations, phased learning path
- Job Board, Interview Scheduler, Interview Questions Bank

**Recruiter**
- Job Post Creator → publishes directly to the shared Job Board
- Interview Question Generator — role-specific questions with bias detection, category tagging, PDF export
- Sample Questions library, Interview Scheduler

## Tech stack

- **Frontend**: React 18, React Router, plain JS (hooks-based, no TypeScript)
- **Backend**: Node.js + Express, MongoDB/Mongoose
- **AI**: Google Gemini API, with a full mock-response layer for demo/offline use
- **Auth & security**: JWT, bcrypt, RBAC, Helmet, express-rate-limit, express-mongo-sanitize
- **Files**: multer, pdf-parse/pdf-lib/pdfkit, mammoth (DOCX), docx (generation)
- **Observability**: Winston (daily-rotate-file), Sentry (optional)
- **Testing**: Jest + Supertest + mongodb-memory-server

## Multi-agent architecture

1. **Resume Intelligence Agent** — resume analysis, ATS scoring, keyword extraction
2. **Communication Agent** — cover letters and outreach correspondence
3. **Career Guidance Agent** — mock interviews, feedback, skills-gap recommendations
4. **Recruiter Agent** — job posts, interview question generation
5. **Training Agent** — course recommendations and learning paths

## Quick start

```bash
# Backend
cd backend
npm install
cp .env.example .env   # set MONGO_URI, JWT_SECRET (see comments), DEMO_MODE=true to skip API keys
npm run dev             # http://localhost:5001

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env
npm start                # http://localhost:3000
```

No MongoDB available locally? The backend's `devDependencies` include `mongodb-memory-server` — see `backend/scripts/dev-mongo.js` for a throwaway local instance you can run with `node scripts/dev-mongo.js`.

Set `DEMO_MODE=true` in `backend/.env` to run every AI feature without a real Gemini API key.

## Security & ops docs

- [`SECURITY.md`](backend/SECURITY.md) — architecture decisions, auth model
- [`CSRF_PROTECTION.md`](backend/CSRF_PROTECTION.md) — why/how CSRF is handled
- [`LOGGING.md`](backend/LOGGING.md) — Winston setup and log levels
- [`GUEST_MODE.md`](backend/GUEST_MODE.md) — frictionless demo account flow

## Project history

Huntloop is an independent, rebranded derivative of a team project (originally "YAAKE") built with 6 other contributors. This repository continues development independently and isn't affiliated with or endorsed by the original team.

## License

GPLv3 — see [`LICENSE`](LICENSE). Derivative works must remain GPLv3-licensed with source available.
