import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CollegeAdminSignupForm from "./pages/CollegeAdminSignupForm/CollegeAdminSignupForm";
import CollegeAdminSigninForm from "./pages/CollegeAdminSinginForm/CollegeAdminSinginForm";
import Home from "./pages/Home/Home";
import AddAdminTeacherForm from "./pages/AddAdminTeacherForm/AddAdminTeacherForm";
import TeacherAdminSingin from "./pages/TeacherAdminSingin/TeacherAdminSingin";
import AddSubjects from "./pages/AddSubjects/AddSubjects";
import AddTeacher from "./pages/AddTeacher/AddTeacher";
import AddStudentParentForm from "./pages/AddStudentParentForm/AddStudentParentForm";
import TeacherSignInForm from "./pages/TeacherSignInForm/TeacherSignInForm";
import StudentSignin from "./pages/StudentSignin/StudentSignin";
import ChatWithAI from "./pages/ChatWithAI/ChatWithAI";
import ParentSignIn from "./pages/ParentSignIn/ParentSignIn";
import DoubtForum from "./pages/DoubtForum/DoubtForum";

function App() {
  // const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route
        path="/college-admin-signup"
        element={<CollegeAdminSignupForm />}
      ></Route>

      <Route
        path="/college-admin-signin"
        element={<CollegeAdminSigninForm />}
      ></Route>

      <Route path="/dashboard" element={<Dashboard />}></Route>

      <Route
        path="/add-admin-teacher"
        element={<AddAdminTeacherForm />}
      ></Route>

      <Route
        path="/teacher-admin-signin"
        element={<TeacherAdminSingin />}
      ></Route>

      <Route path="/add-subject" element={<AddSubjects />}></Route>

      <Route path="/add-teacher" element={<AddTeacher />}></Route>

      <Route
        path="/add-student-parent"
        element={<AddStudentParentForm />}
      ></Route>

      <Route path="/teacher-signin" element={<TeacherSignInForm />}></Route>

      <Route path="/student-signin" element={<StudentSignin />}></Route>

      <Route path="/parent-signin" element={<ParentSignIn />}></Route>

      <Route path="/dashboard/chat" element={<ChatWithAI />}></Route>

      <Route path="/dashboard/doubt-forum" element={<DoubtForum />}></Route>
    </Routes>
  );
}

export default App;
