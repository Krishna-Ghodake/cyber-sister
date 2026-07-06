export const getSOSAlerts = () => {
  const data = localStorage.getItem("sosAlerts");
  return data ? JSON.parse(data) : [];
};

export const addSOSAlert = (alert) => {
  const existing = getSOSAlerts();
  const updated = [alert, ...existing];
  localStorage.setItem("sosAlerts", JSON.stringify(updated));
};

export const updateSOSStatus = (id) => {
  const alerts = getSOSAlerts().map((a) =>
    a.id === id ? { ...a, status: "Resolved" } : a
  );
  localStorage.setItem("sosAlerts", JSON.stringify(alerts));
};
