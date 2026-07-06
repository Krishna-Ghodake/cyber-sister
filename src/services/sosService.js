// src/services/sosService.js

export function sendSOS(data) {
  const existing = JSON.parse(localStorage.getItem("sosAlerts")) || [];
  existing.unshift(data);
  localStorage.setItem("sosAlerts", JSON.stringify(existing));
}

export function getSOSAlerts() {
  return JSON.parse(localStorage.getItem("sosAlerts")) || [];
}
