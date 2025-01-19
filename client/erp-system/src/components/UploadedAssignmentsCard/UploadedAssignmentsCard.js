import React from "react";
import "./UploadedAssignmentsCard.css";

function UploadedAssignmentsCard({ fileName, fileUrl }) {
  return (
    <div className="uploaded-assignments-card">
      <h3 className="assignment-title">{fileName}</h3>
      <div className="assignment-details">
        <a
          className="download-button"
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default UploadedAssignmentsCard;
