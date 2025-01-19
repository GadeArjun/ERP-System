import React from "react";
import "./DetailContainer.css"; // Import the styles file

const DetailContainer = ({ subjects, teachersData, students }) => {
    // console.log(subjects);
    
  return (
    <div className="detail-container">
      {/* Subjects Section */}
      <div className="section">
        <h3 className="section-title">Subjects</h3>
        <div className="list">
          {subjects?.map((sub, index) => (
            <p key={index} className="list-item">{
                sub.subjectName.replace(sub.teacherAdminId, "")}</p>
          ))}
        </div>
      </div>

      {/* Teachers Section */}
      <div className="section">
        <h3 className="section-title">Teachers</h3>
        <div className="list">
          {teachersData?.map((teacher, index) => (
            <p key={index} className="list-item">{teacher.name}</p>
          ))}
        </div>
      </div>

      {/* Students Section */}
      <div className="section">
        <h3 className="section-title">Students</h3>
        <div className="list">
          {students?.map((std, index) => (
            <p key={index} className="list-item">{std.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailContainer;
