import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">
        Cyber Sister – Women Safety Platform
      </h1>

      <div className="card-row">
        <div className="home-card" onClick={() => navigate("/sos")}>
          <h2>🚨 SOS Alert</h2>
          <p>Send your live location instantly</p>
        </div>

        <div
          className="home-card"
          onClick={() => navigate("/emergency")}
        >
          <h2>📞 Emergency Contacts</h2>
          <p>Add & manage trusted contacts</p>
        </div>

        <div
          className="home-card"
          onClick={() => navigate("/admin")}
        >
          <h2>🛡️ Admin Panel</h2>
          <p>View SOS alerts securely</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
