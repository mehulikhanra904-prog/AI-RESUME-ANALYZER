# ✨ Resume Match AI

> **Make every application count.** Compare your resume with a job description, see how well they align, and spot the skills you may want to highlight.

Resume Match AI is a web application for analyzing a resume against a target job description. Upload a resume, paste the role details, and review a match overview, matched and missing skills, and a skill gap summary.

## 🌐 Live demo

- **Frontend:** [Open Resume Match AI](https://ai-resume-analyzer-ten-orpin.vercel.app/)
- **Analysis API:** [Render API](https://ai-resume-analyzer-api-n9aw.onrender.com/)

The React frontend is deployed on Vercel and sends resume-analysis requests to the FastAPI backend hosted on Render.

<!-- Add a screenshot here when one is available:
![Resume Match AI dashboard](docs/screenshots/dashboard.png)
-->

## Contents

- [Live demo](#-live-demo)
- [What it does](#-what-it-does)
- [How to use it](#-how-to-use-it)
- [Technology](#-technology)
- [Project structure](#-project-structure)
- [Getting started](#-getting-started)
- [Analysis flow](#-analysis-flow)
- [Privacy and responsible use](#-privacy-and-responsible-use)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 What it does

- **Resume upload** — Select a resume file in the upload panel.
- **Job description input** — Paste the role description you want to compare against.
- **Resume analysis** — Submit both inputs to the analysis service.
- **Match overview** — Review the analysis result in a dedicated summary.
- **Skills comparison** — See skills identified as matched and missing.
- **Skill gap summary** — Review the difference between the resume and the job requirements.
- **Input validation** — The app asks for both a resume and a job description before analysis.
- **Loading and error feedback** — The interface tracks analysis progress and displays errors returned by the service.

The results are intended to help organize and tailor an application. They do not guarantee an interview or hiring outcome.

## 🧭 How to use it

1. Open Resume Match AI in your browser.
2. Upload your resume.
3. Paste the target job description.
4. Select **Analyze**.
5. Review the match overview, skills comparison, and skill gap chart.
6. Use the findings to decide which relevant experience or skills to clarify in your application.

## 🧰 Technology

| Area | Technology |
| --- | --- |
| User interface | React with JSX |
| Entry point | `src/main.jsx` |
| Analysis integration | `src/services/api` (`analyzeResume`) |
| Build and development setup | Confirm the scripts and toolchain in `package.json` |

The exact backend, file formats, and analysis method depend on the implementation of `src/services/api` and the server it calls.

## 📁 Project structure

The files shared so far show this application structure:

```text
.
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Header
    │   ├── ResumeUpload
    │   ├── JobDescription
    │   ├── AnalyzeButton
    │   ├── MatchOverview
    │   ├── SkillsSection
    │   ├── SkillGapChart
    │   └── EmptyState
    └── services/
        └── api
```

Your repository may contain additional frontend, backend, configuration, and test files.

## ⚙️ Getting started

### Prerequisites

- Node.js and npm.
- Access to the analysis API used by `src/services/api`.

### Install and run

From the repository root:

```bash
npm install
npm run dev
```

Open the local URL printed by the development server. These commands assume the project uses the standard Vite scripts; check `package.json` if either script is unavailable.

### Configure the analysis service

The React app calls `analyzeResume(resume, jobDescription)` from `src/services/api`. Before using analysis, make sure that service points to a running backend and that any required environment variables are configured.

The exact API URL, environment variable names, backend startup steps, and supported resume formats were not included in the source snippets available for this README. Check the service implementation and the repository's environment example before setting them. Never commit API keys or other secrets.

## 🔄 Analysis flow

1. The user selects a resume and enters a job description.
2. `App.jsx` checks that both inputs are present.
3. The app sets its loading state and calls `analyzeResume`.
4. A successful response is stored as the analysis result.
5. `MatchOverview`, `SkillsSection`, and `SkillGapChart` display the result.
6. If the request fails, the app displays the error message returned by the service, or a general fallback message.

## 🔒 Privacy and responsible use

A resume can contain personal information. Review the application's backend and hosting configuration to understand where uploaded files and job descriptions are sent, how long they are retained, and who can access them. Avoid uploading another person's resume without permission.

Use automated matching as a review aid. Check the results yourself, and represent your experience accurately; do not add skills you do not have just to improve a match score.

## 🛠️ Troubleshooting

| Problem | What to check |
| --- | --- |
| The app does not start | Confirm Node.js is installed and check the available scripts in `package.json`. |
| Analysis cannot connect | Confirm the backend is running and the API URL in `src/services/api` is correct. |
| The app asks for a resume | Select a resume file before submitting. |
| The app asks for a job description | Enter a non-empty job description before submitting. |
| A resume upload is rejected | Check the file type and size limits in `ResumeUpload` and the backend. |
| Results look incomplete | Check the API response shape against the fields used by the result components. |

## 🗺️ Roadmap

Potential improvements for the project include:

- Document supported file formats and upload size limits.
- Add clear examples of the analysis response and scoring method.
- Provide a sample job description and a demo result.
- Add accessible progress announcements and more specific error messages.
- Add tests for input validation and analysis result rendering.
- Document deployment, environment variables, and data retention once verified.

## 🤝 Contributing

Contributions are welcome. For a change:

1. Create a feature branch.
2. Keep changes focused and explain the user-facing impact.
3. Run the checks defined in `package.json`.
4. Open a pull request with a clear summary and screenshots for UI changes.

## 📄 License

No license information was available in the source provided. Add the license used by this repository here, along with a `LICENSE` file. Until then, do not assume the project is open source or reuse its code without permission.

---

<div align="center">

**Built to make resume-to-role comparison clearer.**

</div>
