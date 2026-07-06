import React, { useEffect, useState } from "react";
import "./AdminLiveLocation.css";

const AdminLiveLocation = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const alerts = JSON.parse(localStorage.getItem("sosAlerts")) || [];
    setLocations(alerts);
  }, []);

  const openMap = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-live-container">
        <h1>📍 Live SOS Locations</h1>
        <p>Real-time locations received from SOS alerts</p>

        {locations.length === 0 ? (
          <p style={{ textAlign: "center" }}>No SOS location data available</p>
        ) : (
          <table className="live-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Phone</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Time</th>
                <th>Map</th>
              </tr>
            </thead>

            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id}>
                  <td>{loc.id}</td>
                  <td>{loc.name || "—"}</td>
                  <td>{loc.phone || "—"}</td>
                  <td>{loc.latitude}</td>
                  <td>{loc.longitude}</td>
                  <td>{loc.time}</td>
                  <td>
                    <button
                      className="map-btn"
                      onClick={() => openMap(loc.latitude, loc.longitude)}
                    >
                      View Map
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminLiveLocation;
