import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // check admin login (adjust key if you used a different one)
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  const handleLogout = () => {
    // get existing logs
    const logs = JSON.parse(localStorage.getItem("adminLogs")) || [];

    // add logout log
    logs.push({
      username: "admin",
      action: "Admin Logout",
      time: new Date().toLocaleString(),
    });

    // save logs
    localStorage.setItem("adminLogs", JSON.stringify(logs));

    // clear admin session
    localStorage.removeItem("isAdminLoggedIn");

    // redirect to admin login
    navigate("/admin");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Cyber Sister</h2>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/emergency">Emergency</NavLink>

        {!isAdminLoggedIn && <NavLink to="/admin">Admin</NavLink>}

        {isAdminLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
