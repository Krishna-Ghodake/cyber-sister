import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");

      const logs = JSON.parse(localStorage.getItem("adminLogs")) || [];
      logs.push({
        username: "admin",
        action: "Admin Login",
        time: new Date().toLocaleString("en-IN", { hour12: false }),
      });
      localStorage.setItem("adminLogs", JSON.stringify(logs));

      setError("");
      navigate("/admin/dashboard");
    } else {
      setError("❌ Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <h2>🛡 Admin Login</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
