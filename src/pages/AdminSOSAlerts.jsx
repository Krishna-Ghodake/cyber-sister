import React, { useEffect, useState } from "react";
import "./AdminSOSAlerts.css";

const AdminSOSAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  const loadAlerts = () => {
    const storedAlerts =
      JSON.parse(localStorage.getItem("sosAlerts")) || [];
    setAlerts(storedAlerts);
  };

  useEffect(() => {
    loadAlerts();

    // listen for manual update trigger
    window.addEventListener("sosUpdated", loadAlerts);

    return () => {
      window.removeEventListener("sosUpdated", loadAlerts);
    };
  }, []);

  const resolveAlert = (id) => {
    const updatedAlerts = alerts.map((alert) =>
      alert.id === id ? { ...alert, status: "Resolved" } : alert
    );

    localStorage.setItem("sosAlerts", JSON.stringify(updatedAlerts));
    setAlerts(updatedAlerts);

    // trigger update for dashboard
    window.dispatchEvent(new Event("sosUpdated"));
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-sos-container">
        <h1>🚨 SOS Alerts</h1>

        {alerts.length === 0 ? (
          <p>No SOS alerts found.</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="sos-card">
              <p><strong>Name:</strong> {alert.name}</p>
              <p><strong>Location:</strong> {alert.location}</p>
              <p><strong>Time:</strong> {alert.time}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    alert.status === "Active"
                      ? "status-active"
                      : "status-resolved"
                  }
                >
                  {alert.status}
                </span>
              </p>

              {alert.status === "Active" && (
                <button
                  className="resolve-btn"
                  onClick={() => resolveAlert(alert.id)}
                >
                  Mark as Resolved
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminSOSAlerts;
