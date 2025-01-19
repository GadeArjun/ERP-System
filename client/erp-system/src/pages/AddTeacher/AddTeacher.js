import React, { useContext, useEffect, useState } from "react";
import "./AddTeacher.css";
import axios from "axios";
import userDataContext from "../../context/userDataContext";

function AddTeacher() {
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    password: "",
    branchCode: "",
    subjects: "",
    subjectCode: "",
    collegeAdminId: "",
    teacherAdminId: "",
    subjectId: "",
  });
  const [collegeAdminId, setCollegeAdminId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const token = localStorage.getItem("token");
  const { userData, setUserData } = useContext(userDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const subjectCode = teacherData.subjectCode;

      // console.log(subjects);
      

      const subjectId = subjects.filter(
        (sub) => sub.subjectCode.replace(userData?._id , "") === subjectCode
      );

      // console.log(subjectId[0], userData, collegeAdminId);

      const updatedTeachersData = {
        ...teacherData,
        collegeAdminId: collegeAdminId?._id,
        teacherAdminId: userData._id,
        subjectId: subjectId[0]._id,
      };
      // console.log(updatedTeachersData);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teacher`,
        updatedTeachersData
      );

      // console.log(response.data);
      if (response.status === 201) {
        alert("Teacher add succefully.");
      }

      // console.log("Teacher Data Submitted:", updatedTeachersData);
      setTeacherData({
        name: "",
        email: "",
        password: "",
        branchCode: "",
        subjects: "",
        subjectCode: "",
        collegeAdminId: "",
        teacherAdminId: "",
        subjectId: "",
      });
    } catch (err) {
      console.log(err);

      alert(err?.response?.data);
    }
  };

  // console.log({ token });

  useEffect(() => {
    async function fetchSubject(token) {
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
        // console.log(teachersResponse.data);
        setCollegeAdminId(teachersResponse.data.collegeAdminData);
        setUserData(teachersResponse.data.teacherAdminData);

        // console.log(teachersResponse.data);

        const userId = teachersResponse.data.teacherAdminData._id;

        // console.log({ userId });

        const subjectResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/subjects`,
          {
            params: { userId },
          }
        );
        setSubjects(subjectResponse.data);

        // console.log(subjects);
      } catch (err) {
        console.log({ err });
      }
    }
    fetchSubject(token);
  }, [token]);

  return (
    <div className="add-teacher-container">
      <h1 className="title">Add New Teacher</h1>
      <form className="add-teacher-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={teacherData.name}
            onChange={handleChange}
            placeholder="Enter teacher's name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={teacherData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={teacherData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="branchCode">Branch Code</label>
          <input
            type="text"
            id="branchCode"
            name="branchCode"
            value={teacherData.branchCode}
            onChange={handleChange}
            placeholder="Enter branch code"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subjects">Subjects</label>

          <select
            id="subjects"
            name="subjects"
            value={teacherData.subjects}
            onChange={handleChange}
          >
            <option>Select subject</option>

            {subjects.map((sub, index) => {
              return (
                <option key={index}>
                  {sub.subjectName.replace(userData?._id, "")}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subjectCode">Subject Codes</label>

          <select
            id="subjectCode"
            name="subjectCode"
            value={teacherData.subjectCode}
            onChange={handleChange}
          >
            <option>Select subject code</option>
            {subjects.map((sub, index) => {
              return (
                <option>{sub.subjectCode.replace(userData?._id, "")}</option>
              );
            })}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Add Teacher
        </button>
      </form>
    </div>
  );
}

export default AddTeacher;
