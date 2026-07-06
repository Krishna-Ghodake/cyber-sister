import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeCount, setActiveCount] = useState(0);

  const updateCount = () => {
    const alerts =
      JSON.parse(localStorage.getItem("sosAlerts")) || [];

    const activeAlerts = alerts.filter(
      (alert) => alert.status === "Active"
    );

    setActiveCount(activeAlerts.length);
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("sosUpdated", updateCount);

    return () => {
      window.removeEventListener("sosUpdated", updateCount);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-card">
        <h2>🚨 Active SOS Alerts</h2>
        <div className="alert-count">
          {activeCount}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



