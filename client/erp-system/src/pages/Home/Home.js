import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import CSS for styling

function Home() {
 

  return (
    <div className="home-container">
      <h1>Welcome to the ERP System</h1>
      <div className="button-group">
        <Link to="/college-admin-signup" className="home-button">
          College Admin Signup
        </Link>
        <Link to="/teacher-admin-signin" className="home-button">
          Teacher Admin Sign In
        </Link>
        <Link to="/teacher-signin" className="home-button">
          Teacher Sign In
        </Link>
        <Link to="/student-signin" className="home-button">
          Student Sign In
        </Link>
        <Link to="/parent-signin" className="home-button">
          Parent Sign In
        </Link>
      </div>
    </div>
  );
}

export default Home;
