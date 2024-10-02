import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Context/LoginContext/authContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <NavLink to="/" className="nav-link" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/lvrv" className="nav-link" activeClassName="active">
        LV & RV
      </NavLink>
      <NavLink to="/strain" className="nav-link" activeClassName="active">
        Strain
      </NavLink>
      <NavLink to="/ecv" className="nav-link" activeClassName="active">
        ECV
      </NavLink>                                                              {/* Code for Navbar */}
      <NavLink to="/image" className="nav-link" activeClassName="active">
        Image upload
      </NavLink>
      <NavLink to="/report" className="nav-link" activeClassName="active">
        Report
      </NavLink>
      {isLoggedIn && (
          <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Navbar;
