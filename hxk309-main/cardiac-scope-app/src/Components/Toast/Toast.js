import React, { useEffect, useState } from "react";
import "./Toast.css";

const Toast = ({ message, onClose, successState, errorState }) => {
  const [error, setError] = useState(errorState);
  const [success, setSuccess] = useState(successState);
  useEffect(() => {
    const timer = setTimeout(onClose, 2000000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <React.Fragment>
      {error && <div className="toast">{message}</div>}
      {success && <div className="toast-success">{message}</div>}
    </React.Fragment>
  );
};

export default Toast;
