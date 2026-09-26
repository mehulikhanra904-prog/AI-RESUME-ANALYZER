function SkillsSection({ result }) {
  const matchedSkills = Array.isArray(result?.matched_skills)
    ? result.matched_skills
    : [];
  const missingSkills = Array.isArray(result?.missing_skills)
    ? result.missing_skills
    : [];

  return (
    <section className="skills-grid">
      <div className="skill-panel">
        <div className="skill-heading">
          <div>
            <span className="skill-indicator matched-indicator"></span>
            <h3>Matched skills</h3>
          </div>
          <span>{matchedSkills.length}</span>
        </div>

        <div className="skill-list">
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill) => (
              <span className="skill-tag matched" key={skill}>
                {skill}
              </span>
            ))
          ) : (
            <p className="empty-message">No direct skill matches were found.</p>
          )}
        </div>
      </div>

      <div className="skill-panel">
        <div className="skill-heading">
          <div>
            <span className="skill-indicator missing-indicator"></span>
            <h3>Skills to develop</h3>
          </div>
          <span>{missingSkills.length}</span>
        </div>

        <div className="skill-list">
          {missingSkills.length > 0 ? (
            missingSkills.map((skill) => (
              <span className="skill-tag missing" key={skill}>
                {skill}
              </span>
            ))
          ) : (
            <p className="empty-message">No missing skills detected.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;