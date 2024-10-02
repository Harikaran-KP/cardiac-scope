import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "../../../src/Context/LoginContext/authContext";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Container.css";
import EcvCalculator from "../ECVCalculator/ECVCalculator";
import Toast from "../../Components/Toast/Toast";
import { useToast } from "../../Context/ToastContext/toastContext";
import LVRVCalculator from "../LVRVCalculator/LVRVCalculator";
import StrainCalculator from "../StrainCalculator/StrainCalculator";
import ReportPage from "../Report/Report";
import ImageUpload from "../ImageUpload/ImageUpload";

const Container = () => {
  const { isLoggedIn } = useAuth();
  const toast = useToast();

  return (
    <React.Fragment>
      <>
        {!isLoggedIn ? (
          <div className="login-container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Login />} />
            </Routes>
          </div>
        ) : (
          <div className="container">
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ecv" element={<EcvCalculator />} />
              <Route path="/image" element={<ImageUpload />} />
              <Route path="/lvrv" element={<LVRVCalculator />} />
              <Route path="/strain" element={<StrainCalculator />} />
              <Route path="/report" element={<ReportPage />} />
            </Routes>
          </div>
        )}
        {/* <Toast
          className='toast'
          message={toast.toastMessage}
          successState={toast.success === "Yes" ? true : false}
          errorState={toast.success === ("" || "No") ? true : false}
          onClose={() => toast.setToastMessage(null)}
        /> */}
        {/* <Toast className='toast'></Toast> */}
      </>
    </React.Fragment>
  );
};

export default Container;
