import React, { useState } from "react";
import axios from "../../Services/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../Components/Toast/Toast";
import "./Register.css";
import { useToast } from "../../Context/ToastContext/toastContext";

function Register() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const toast = useToast()

  const handleRegister = async (e) => {
    //Registration block

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { first_name, last_name, email, password }
      );
      alert('Registration successful:', response.data);
      // toast.setToastMessage("Registeration successful");
      navigate("/")
      // toast.setSuccess("Yes");
    } catch (error) {
      console.error("Registration error:", error);
      // toast.setSuccess("No");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            className="form-control"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            className="form-control"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already a user? <Link to="/login">Login here</Link>
      </p>
      {/* {toastMessage && (
        <Toast
          message={toastMessage}
          successState={success === "Yes" ? true : false}
          errorState={success === ("" || "No") ? true : false}
          onClose={() => setToastMessage(null)}
        />
      )} */}
    </div>
  );
}

export default Register;
