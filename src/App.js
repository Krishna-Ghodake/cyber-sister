import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SOS from "./pages/SOS";
import EmergencyContacts from "./pages/EmergencyContacts";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminSOSAlerts from "./pages/AdminSOSAlerts";
import AdminEmergencyContacts from "./pages/AdminEmergencyContacts";
import AdminLiveLocation from "./pages/AdminLiveLocation";
import AdminSecurity from "./pages/AdminSecurity";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/emergency" element={<EmergencyContacts />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* PROTECTED ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sos-alerts"
          element={
            <ProtectedRoute>
              <AdminSOSAlerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/emergency-contacts"
          element={
            <ProtectedRoute>
              <AdminEmergencyContacts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/live-location"
          element={
            <ProtectedRoute>
              <AdminLiveLocation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/security"
          element={
            <ProtectedRoute>
              <AdminSecurity />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
