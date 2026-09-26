function SkillGapChart({ result }) {

  const matched =
    result.matched_skills?.length || 0;

  const missing =
    result.missing_skills?.length || 0;

  const total = matched + missing;

  const matchedPercent =
    total > 0
      ? Math.round((matched / total) * 100)
      : 0;

  const missingPercent =
    total > 0
      ? 100 - matchedPercent
      : 0;


  return (
    <section className="skill-gap-panel">

      <div className="skill-gap-header">

        <div>

          <p className="eyebrow">
            SKILL GAP
          </p>

          <h2>
            Role readiness
          </h2>

        </div>


        <span className="skill-gap-total">
          {total} skills detected
        </span>

      </div>


      {/* Skill Progress Bar */}
      <div className="skill-bar">

        <div
          className="skill-bar-matched"
          style={{
            width: `${matchedPercent}%`
          }}
        />

        <div
          className="skill-bar-missing"
          style={{
            width: `${missingPercent}%`
          }}
        />

      </div>


      {/* Statistics */}
      <div className="skill-gap-stats">


        {/* Matched */}
        <div className="gap-stat">

          <div className="gap-stat-label">

            <span
              className="gap-dot matched-dot"
            />

            Matched

          </div>

          <strong>
            {matched}
          </strong>

          <span>
            {matchedPercent}% of detected skills
          </span>

        </div>


        {/* Missing */}
        <div className="gap-stat">

          <div className="gap-stat-label">

            <span
              className="gap-dot missing-dot"
            />

            To develop

          </div>

          <strong>
            {missing}
          </strong>

          <span>
            {missingPercent}% of detected skills
          </span>

        </div>

      </div>

    </section>
  );
}


export default SkillGapChart;