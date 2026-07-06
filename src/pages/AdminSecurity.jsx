import React, { useEffect, useState } from "react";
import "./AdminSecurity.css";

const AdminSecurity = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("securityLogs")) || [];
    setLogs(stored);
  }, []);

  const clearLogs = () => {
    if (window.confirm("Clear all security logs?")) {
      localStorage.removeItem("securityLogs");
      setLogs([]);
    }
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-security-container">
        <h1>🔐 Security System</h1>
        <p>Admin activity & login history</p>

        <button className="danger" onClick={clearLogs}>
          Clear Logs
        </button>

        {logs.length === 0 ? (
          <p>No security logs found</p>
        ) : (
          <table className="security-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Action</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.username}</td>
                  <td>{log.action}</td>
                  <td>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSecurity;
