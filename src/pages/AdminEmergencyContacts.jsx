import React, { useEffect, useState } from "react";
import "./AdminEmergencyContacts.css";

const AdminEmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("emergencyContacts")) || [];
    setContacts(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("emergencyContacts", JSON.stringify(data));
    setContacts(data);
  };

  const handleAddOrUpdate = () => {
    if (!name || !phone) {
      alert("Please enter name and phone");
      return;
    }

    if (editingId) {
      const updated = contacts.map((c) =>
        c.id === editingId ? { ...c, name, phone } : c
      );
      saveToStorage(updated);
      setEditingId(null);
    } else {
      const newContact = {
        id: Date.now(),
        name,
        phone,
      };
      saveToStorage([newContact, ...contacts]);
    }

    setName("");
    setPhone("");
  };

  const editContact = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditingId(contact.id);
  };

  const deleteContact = (id) => {
    if (window.confirm("Delete this contact?")) {
      const updated = contacts.filter((c) => c.id !== id);
      saveToStorage(updated);
    }
  };

  const clearAll = () => {
    if (window.confirm("Clear all emergency contacts?")) {
      localStorage.removeItem("emergencyContacts");
      setContacts([]);
    }
  };

  return (
    <div className="admin-page-wrapper">
      <div className="admin-emergency-container">
        <h1>📞 Emergency Contacts</h1>

        {/* FORM */}
        <div className="contact-form">
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

          <button onClick={handleAddOrUpdate}>
            {editingId ? "Update" : "Add"}
          </button>

          <button className="danger" onClick={clearAll}>
            Clear All
          </button>
        </div>

        {/* TABLE */}
        {contacts.length === 0 ? (
          <p>No emergency contacts</p>
        ) : (
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>
                    <button onClick={() => editContact(c)}>Edit</button>
                    <button
                      className="danger"
                      onClick={() => deleteContact(c.id)}
                    >
                      Delete
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

export default AdminEmergencyContacts;
