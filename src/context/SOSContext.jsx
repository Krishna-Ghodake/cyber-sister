import { createContext, useState } from "react";

export const SOSContext = createContext();

export function SOSProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const sendSOS = (alert) => {
    setAlerts((prev) => [...prev, alert]);
  };

  return (
    <SOSContext.Provider value={{ alerts, sendSOS }}>
      {children}
    </SOSContext.Provider>
  );
}
