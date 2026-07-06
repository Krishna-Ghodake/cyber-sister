import React, { useState } from "react";
import "./SOS.css";

const SOS = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleSOS = () => {
    if (!name || !phone) {
      alert("Please fill all details");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userLocation = `Lat: ${lat}, Lng: ${lng}`;

        setLocation(userLocation);

        const alerts = JSON.parse(localStorage.getItem("sosAlerts")) || [];

        const newAlert = {
          id: Date.now(),
          name: name,
          phone: phone,
          location: userLocation,
          time: new Date().toLocaleString("en-IN", { hour12: false }),
          status: "Active",
        };

        alerts.push(newAlert);

        localStorage.setItem("sosAlerts", JSON.stringify(alerts));

        window.dispatchEvent(new Event("sosUpdated"));

        alert("🚨 SOS Alert Sent Successfully!");

        // reset form
        setName("");
        setPhone("");
      },
      (error) => {
        alert("Unable to fetch location. Please allow location access.");
      }
    );
  };

  return (
    <div className="sos-container">
      <h1>🚨 Emergency SOS</h1>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={handleSOS} className="sos-btn">
        Send SOS
      </button>
    </div>
  );
};

export default SOS;
