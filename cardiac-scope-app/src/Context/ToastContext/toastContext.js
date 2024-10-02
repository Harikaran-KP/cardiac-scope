import React, { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);
  const [success, setSuccess] = useState("");

  return (
    <ToastContext.Provider
      value={{ toastMessage, setToastMessage, success, setSuccess }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
