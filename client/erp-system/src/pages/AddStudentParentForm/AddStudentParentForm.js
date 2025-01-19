import React, { useContext, useEffect, useState } from "react";
import "./AddStudentParentForm.css";
import userDataContext from "../../context/userDataContext";
import axios from "axios";

function AddStudentParentForm() {
  const token = localStorage.getItem("token");
  const { userData, setUserData } = useContext(userDataContext);
  const [teachersData, setTeacherData] = useState([]);
  // const [students, setStudents] = useState([]);
  const [collegeId, setCollegeId] = useState("");
  const [subjects, setSubjects] = useState([]);

  const [studentDetails, setStudentDetails] = useState({
    name: "",
    class: "",
    email: "",
    password: "",
    collegeId: "",
    teacherAdminId: "",
    subjectId: "",
  });

  const [parentDetails, setParentDetails] = useState({
    name: "",
    email: "",
    password: "",
    studentId: "",
  });

  useEffect(() => {
    async function fetchData(token) {
      try {
        // console.log({ token });

        const teachersResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/teachers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log(teachersResponse.data, "from add sp");
        setTeacherData(teachersResponse.data.teacherData);
        setUserData(teachersResponse.data.teacherAdminData);

        const userId = teachersResponse.data.teacherAdminData._id;

        setCollegeId(userId);

        // console.log({ userId });

        const subjectResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/subjects`,
          {
            params: { userId },
          }
        );

        setSubjects(subjectResponse.data);
        const updatedSubjects = subjectResponse.data.filter(
          (sub, index, self) => {
            return self.findIndex((s) => s.class === sub.class) === index;
          }
        );
        setSubjects(updatedSubjects);

        // console.log({ subjects }, { updatedSubjects });
      } catch (err) {
        console.log({ err });
      }
    }
    fetchData(token);
  }, [token]);

  // Handle changes for Student Details
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
  };

  // Handle changes for Parent Details
  const handleParentChange = (e) => {
    const { name, value } = e.target;
    setParentDetails({ ...parentDetails, [name]: value });
  };

  // Handle form submission for both forms
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log("Student Details:", studentDetails);

      const sub = subjects.find((sub) => sub.class === studentDetails.class);

      // console.log(sub);

      const upadatedStudentDetails = {
        ...studentDetails,
        collegeId: collegeId,
        teacherAdminId: userData._id,
        subjectId: sub?._id,
      };

      const studentResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/student`,
        upadatedStudentDetails
      );
      

      // console.log({ studentResponse });

      const studentId = studentResponse.data.student._id;

      // console.log({ studentId });

      const updatedParentDeatails = {
        ...parentDetails,
        studentId: studentId,
      };

      const parentResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/parent`,
        updatedParentDeatails
      );

      // console.log(parentResponse);
      alert("student details add successfuly.");
      // console.log("Parent Details:", parentDetails, updatedParentDeatails);
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }

    // Add logic to send data to the backend API
  };

  return (
    <div className="add-forms-container">
      <h1 className="form-title">Add Student and Parent</h1>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        {/* Student Form */}
        <div className="form-section">
          <h2>Student Details</h2>
          <div className="form-group">
            <label htmlFor="studentName">Name</label>
            <input
              type="text"
              id="studentName"
              name="name"
              value={studentDetails.name}
              onChange={handleStudentChange}
              placeholder="Enter student's name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentName">Class</label>
            <select
              id="studentClass"
              name="class"
              value={studentDetails.class}
              onChange={handleStudentChange}
              required
            >
              <option>Select class</option>
              {subjects.map((sub, index) => {
                return <option key={index}>{sub.class}</option>;
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="studentEmail">Email</label>
            <input
              type="email"
              id="studentEmail"
              name="email"
              value={studentDetails.email}
              onChange={handleStudentChange}
              placeholder="Enter student's email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentPassword">Password</label>
            <input
              type="password"
              id="studentPassword"
              name="password"
              value={studentDetails.password}
              onChange={handleStudentChange}
              placeholder="Enter student's password"
              required
            />
          </div>
        </div>

        {/* Parent Form */}
        <div className="form-section">
          <h2>Parent Details</h2>
          <div className="form-group">
            <label htmlFor="parentName">Name</label>
            <input
              type="text"
              id="parentName"
              name="name"
              value={parentDetails.name}
              onChange={handleParentChange}
              placeholder="Enter parent's name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentEmail">Email</label>
            <input
              type="email"
              id="parentEmail"
              name="email"
              value={parentDetails.email}
              onChange={handleParentChange}
              placeholder="Enter parent's email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentPassword">Password</label>
            <input
              type="password"
              id="parentPassword"
              name="password"
              value={parentDetails.password}
              onChange={handleParentChange}
              placeholder="Enter parent's password"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Submit Details
        </button>
      </form>
    </div>
  );
}

export default AddStudentParentForm;
