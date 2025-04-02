import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showNotification = (msg, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {message && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-2xl shadow-lg transition-opacity duration-300 z-50">
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
