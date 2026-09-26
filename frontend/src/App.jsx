import { useState } from "react";

import Header from "./components/Header";
import ResumeUpload from "./components/ResumeUpload";
import JobDescription from "./components/JobDescription";
import AnalyzeButton from "./components/AnalyzeButton";
import MatchOverview from "./components/MatchOverview";
import SkillsSection from "./components/SkillsSection";
import EmptyState from "./components/EmptyState";
import SkillGapChart from "./components/SkillGapChart";

import { analyzeResume } from "./services/api";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await analyzeResume(resume, jobDescription);
      setResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="hero">
          <h1>AI Resume Analyzer</h1>
          <p>
            Upload your resume and compare it with a job description using AI.
          </p>
        </section>

        <section className="input-section">
          <ResumeUpload
            file={resume}
            onFileChange={setResume}
          />

          <JobDescription
            value={jobDescription}
            onChange={setJobDescription}
          />

          <AnalyzeButton
            onClick={handleAnalyze}
            loading={loading}
            disabled={!resume || !jobDescription.trim()}
          />

          {error && <p className="error-message" role="alert">{error}</p>}
        </section>

        {result ? (
          <section className="results">
            <MatchOverview result={result} />

            <SkillsSection result={result} />

            <SkillGapChart result={result} />
          </section>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default App;
