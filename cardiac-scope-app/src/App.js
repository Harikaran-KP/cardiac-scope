import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./App.css";
import Container from "./pages/Container/Container";
import { AuthProvider } from "./Context/LoginContext/authContext";
import { ProfileProvider } from "./Context/ProfileContext/profileContext";
import { AuthenticateProvider } from "./Context/AuthContext/authenticateContext";
import { ToastProvider } from "./Context/ToastContext/toastContext";
import { LVRVProvider } from "./Context/LVRVContext/lvrvContext";
import { StrainProvider } from "./Context/SrainContext/strainContext";

function App() {
  return (
    <Router>
      <AuthenticateProvider>
        <AuthProvider>
          <ProfileProvider>
            <StrainProvider>
              <LVRVProvider>
                <ToastProvider>
                  <Container></Container>
                </ToastProvider>
              </LVRVProvider>
            </StrainProvider>
          </ProfileProvider>
        </AuthProvider>
      </AuthenticateProvider>
    </Router>
  );
}

export default App;
