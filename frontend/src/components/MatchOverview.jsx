function MatchOverview({ result }) {
  const matchedSkills = Array.isArray(result?.matched_skills)
    ? result.matched_skills
    : [];
  const missingSkills = Array.isArray(result?.missing_skills)
    ? result.missing_skills
    : [];
  const score = Math.round(result.match_score);

  let label = "Needs improvement";

  if (score >= 75) {
    label = "Strong alignment";
  } else if (score >= 50) {
    label = "Good alignment";
  } else if (score >= 30) {
    label = "Partial alignment";
  }

  return (
    <section className="results-panel">
      <div className="results-header">
        <div>
          <p className="eyebrow">ANALYSIS COMPLETE</p>
          <h2>Resume match</h2>
        </div>

        <span className="result-file">
          {result.filename}
        </span>
      </div>

      <div className="score-layout">
        <div
          className="score-ring"
          style={{
            "--score": `${score * 3.6}deg`,
          }}
        >
          <div className="score-inner">
            <strong>{score}%</strong>
            <span>match</span>
          </div>
        </div>

        <div className="score-copy">
          <span className="score-label">
            {label}
          </span>

          <h3>
            Your resume has a {score}% match with
            this job description.
          </h3>

          <p>
            The score combines text similarity with
            overlap between skills found in your resume
            and skills mentioned in the job description.
          </p>
        </div>
      </div>

      <div className="metrics">
        <div>
          <span>Text similarity</span>
          <strong>
            {result.text_similarity}%
          </strong>
        </div>

        <div>
          <span>Skills matched</span>
          <strong>
            {matchedSkills.length}
          </strong>
        </div>

        <div>
          <span>Skills missing</span>
          <strong>
            {missingSkills.length}
          </strong>
        </div>
      </div>
    </section>
  );
}

export default MatchOverview;
