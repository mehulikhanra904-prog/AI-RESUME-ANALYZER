# AI Resume Analyzer

This repository contains a React frontend and a FastAPI backend for comparing a text-based PDF resume with a job description. The current score uses keyword and text overlap heuristics; it does not call a generative AI service.

## Run locally

Start the API from `backend`:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

In another terminal, start the frontend:

```powershell
cd frontend
npm ci
Copy-Item .env.example .env.local
npm run dev
```

The frontend sends PDF resumes and job descriptions to `POST /analyze`. Set `VITE_API_URL` to the API base URL when deploying the frontend. Set the backend's `FRONTEND_ORIGIN` to the deployed frontend origin when you want to restrict browser access.

## Deploy

- Frontend: deploy the `frontend` directory as a Vite app. Build with `npm run build`, output `dist`, and set `VITE_API_URL` to the deployed API URL.
- Backend: deploy the `backend` directory as a Python service. Install `requirements.txt` and start with `uvicorn main:app --host 0.0.0.0 --port $PORT`.
