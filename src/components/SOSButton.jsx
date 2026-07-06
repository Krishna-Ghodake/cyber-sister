export default function SOSButton() {
  const sendSOS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const alertData = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          time: new Date().toLocaleString()
        };

        const existing =
          JSON.parse(localStorage.getItem("sosAlerts")) || [];

        existing.push(alertData);
        localStorage.setItem("sosAlerts", JSON.stringify(existing));

        alert("🚨 SOS Sent Successfully!");
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  return (
    <button
      onClick={sendSOS}
      style={{
        background: "red",
        color: "white",
        padding: "15px 25px",
        fontSize: "18px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
      }}
    >
      🚨 EMERGENCY SOS
    </button>
  );
}
