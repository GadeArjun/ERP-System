import React from "react";
import "./SubjectCard.css";

function SubjectCard({
  subjectName,
  teacherAdminId,
  setSelectedSubjectId,
  subjectId,
  setIsSelect,
}) {
  const handleCardClick = (subjectId) => {
    setSelectedSubjectId(subjectId);
    // console.log(subjectId);
    setIsSelect(true);
  };

  return (
    <div className="subject-card" onClick={() => handleCardClick(subjectId)}>
      <h3>{subjectName.replace(teacherAdminId, "")}</h3>
    </div>
  );
}

export default SubjectCard;
