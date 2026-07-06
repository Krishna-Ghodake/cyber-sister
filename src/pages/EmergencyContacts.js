import React, { useEffect, useState } from "react";
import "./EmergencyContacts.css";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("emergencyContacts");
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  const addContact = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please fill all fields");
      return;
    }

    const newContact = { name, phone };

    const updated = [newContact, ...contacts];
    setContacts(updated);
    localStorage.setItem("emergencyContacts", JSON.stringify(updated));

    setName("");
    setPhone("");
  };

  return (
    <div className="emergency-page">
      <h1>📞 Emergency Contacts</h1>

      {/* ADD CONTACT PANEL */}
      <div className="add-contact-box">
        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={addContact}>Add Contact</button>
      </div>

      {/* CONTACT LIST */}
      <div className="contact-list">
        {contacts.length === 0 ? (
          <p>No emergency contacts added</p>
        ) : (
          contacts.map((c, i) => (
            <div className="contact-card" key={i}>
              <strong>{c.name}</strong>
              <span>{c.phone}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
