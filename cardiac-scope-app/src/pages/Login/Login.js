import React, { useState } from "react";
import axios from "../../Services/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../Context/LoginContext/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e) => {
    // Function that submits login credentials using axios, to the server. 
    // Authentication token is received from the server as response. 
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log("Login successful:", response.data);
      auth.login(response.data.token); 
      navigate("/");
    } catch (error) {
      alert("Invalid credentials!")
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container-login">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
          Login
        </button>
      </form>
      <p className="mt-3">
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
