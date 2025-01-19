import React, { useState, useEffect } from "react";
import "./Assignments.css";
import axios from "axios";

function Assignments({ std_class, subjectId, teacherAdminId }) {
  const [assignments, setAssignments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing assignments from the API
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/assignments`,
          {
            params: { subjectId },
          }
        ); // Replace with your API endpoint

        // console.log(response.data);

        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      alert("Please select a file to upload.");
      setLoading(false);

      return;
    }

    if (!subjectId || !std_class || !teacherAdminId) {
      console.error("Subject ID is required");
      alert("Something went wrong.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("subjectId", subjectId);
    formData.append("std_class", std_class);
    formData.append("teacherAdminId", teacherAdminId);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/assignment`,
        formData
      );

      // console.log(response);

      if (response.status === 201) {
        alert("Assignment uploaded successfully!");
        const newAssignment = response.data;
        setAssignments((prevAssignments) => [
          ...prevAssignments,
          newAssignment,
        ]);
        setSelectedFile(null);
      } else {
        alert("Error uploading the assignment.");
      }
    } catch (error) {
      console.error("Error uploading the assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/assignment`,
        {
          params: { id },
        }
      );

      if (response.status === 200) {
        alert("Assignment deleted successfully!");
        setAssignments((prevAssignments) =>
          prevAssignments.filter((assignment) => assignment._id !== id)
        );
      } else {
        alert("Error deleting the assignment.");
      }
    } catch (error) {
      console.error("Error deleting the assignment:", error);
    }
  };

  return (
    <div className="assignments-container">
      <h2>Assignments</h2>

      <div className="upload-section">
        <h3>Upload Assignment</h3>
        <input type="file" onChange={handleFileChange} />
        <button
          className="upload-button"
          style={{
            backgroundColor: `${loading ? "rgb(25 119 29)" : "#4caf50"}`,
          }}
          onClick={loading ? "" : handleUpload}
        >
          {loading ? "Loading..." : "Upload"}
        </button>
      </div>

      <div className="previous-assignments">
        <h3>Previous Assignments</h3>
        {assignments.length > 0 ? (
          <ul className="assignments-list">
            {assignments.map((assignment) => (
              <li key={assignment._id} className="assignment-item">
                <div
                  style={{
                    width: "59%",
                    overflow: "hidden",
                    height: "100%",
                    textOverflow: "ellipsis",
                  }}
                >
                  <strong>{assignment.fileName}</strong> <br />
                  Uploaded on: {new Date(assignment.createdAt).toLocaleString()}
                </div>
                <div>
                  <a
                    href={`${
                      process.env.REACT_APP_BACKEND_URL + assignment.fileUrl
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(assignment._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No assignments uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Assignments;
