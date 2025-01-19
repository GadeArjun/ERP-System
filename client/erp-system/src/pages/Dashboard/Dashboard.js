import React from "react";
import CollegeAdminDashboard from "../../components/CollegeAdminDashboard/CollegeAdminDashboard";
import TeacherAdminDashboard from "../../components/TeacherAdminDashboard/TeacherAdminDashboard";
import TeacherDashboard from "../../components/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "../../components/StudentDashboard/StudentDashboard";
import ParentDashboard from "../../components/ParentDashboard/ParentDashboard";

export default function Dashboard() {
  const role = localStorage.getItem("role");
  // console.log(role);

  switch (role) {
    case "CollegeAdmin":
      return <CollegeAdminDashboard />;
    case "TeacherAdmin":
      return <TeacherAdminDashboard />;

    case "Teacher":
      return <TeacherDashboard />;

    case "Student":
      return <StudentDashboard />;

    case "Parent":
      return <ParentDashboard />;

    default:
      break;
  }
}
