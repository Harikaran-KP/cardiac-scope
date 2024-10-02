import React, { useState, useEffect } from "react";
import "./ECVCalculator.css";
import Toast from "../../Components/Toast/Toast";

const EcvCalculator = () => {
  const [inputs, setInputs] = useState({
    preMyo: "",
    postMyo: "",
    preBlood: "",
    postBlood: "",
    hctMyo: "",
  });
  const [ecv, setEcv] = useState(null);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("ecvData"));
    if (savedData) {
      setInputs({
        preMyo: savedData.preMyo || "",
        postMyo: savedData.postMyo || "",
        preBlood: savedData.preBlood || "",
        postBlood: savedData.postBlood || "",
        hctMyo: savedData.hctMyo || "",
      });
      setEcv(savedData.ecv || null);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInputs = {
      ...inputs,
      [name]: value,
    };
    setInputs(newInputs);
    localStorage.setItem("ecvInputs", JSON.stringify(newInputs));
  };

  const calculateEcv = () => {
    const { preMyo, postMyo, preBlood, postBlood, hctMyo } = inputs;

    if (preMyo && postMyo && preBlood && postBlood && hctMyo) {
      const preMyoNum = parseFloat(preMyo);
      const postMyoNum = parseFloat(postMyo);
      const preBloodNum = parseFloat(preBlood);
      const postBloodNum = parseFloat(postBlood);
      const hctMyoNum = parseFloat(hctMyo);

      const s1 = 1.0 / postMyoNum - 1.0 / preMyoNum;
      const s2 = 1.0 / postBloodNum - 1.0 / preBloodNum;   {/* Calculation of ECV*/}
      const ecvValue = ((1.0 - hctMyoNum) * s1) / s2;

      setEcv((ecvValue.toFixed(3))*100);
      setError(null);
    } else {
      setError("Please input valid data");
      setToastMessage("Please input valid data");
    }
  };

  const saveEcv = () => {
    if (error) {
      setError("Please input valid data");
    } else {
      if (ecv) {
        const ecvData = { ...inputs, ecv };                               {/* Saving to local storage */}
        localStorage.setItem("ecvData", JSON.stringify(ecvData));
        setToastMessage("ECV value and inputs saved successfully!");
      } else {
        setToastMessage("No ECV value to save.");
      }
    }
  };

  return (
    <div className="ecv-calculator-container">
      <div className="top-bar">
        <h1>
          <b>ECV Calculator</b>
        </h1>
      </div>
      <div className="form-block">
        <div className="input-block-bar">
          <div className="input-group">
            <label htmlFor="preMyo">Pre Myocardium T1</label>
            <input
              type="text"
              id="preMyo"
              name="preMyo"
              value={inputs.preMyo}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="postMyo">Post Myocardium T1</label>
            <input
              type="text"
              id="postMyo"
              name="postMyo"
              value={inputs.postMyo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-block-bar">
          <div className="input-group">
            <label htmlFor="preBlood">Pre Blood Pool T1</label>
            <input
              type="text"
              id="preBlood"
              name="preBlood"
              value={inputs.preBlood}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="postBlood">Post Blood Pool T1</label>
            <input
              type="text"
              id="postBlood"
              name="postBlood"
              value={inputs.postBlood}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-block-bar">
          <div className="input-group">
            <label htmlFor="hctMyo">Hematocrit</label>
            <input
              type="text"
              id="hctMyo"
              name="hctMyo"
              value={inputs.hctMyo}
              onChange={handleChange}
            />
          </div>
          <div className="input-group"></div>
        </div>
        <div className="button-group">
          <button className="btn btn-primary" onClick={calculateEcv}>
            Calculate ECV
          </button>
          <button className="btn btn-secondary" onClick={saveEcv}>
            Save ECV
          </button>
        </div>

        {ecv && (
          <p className="result">
            <strong>ECV:</strong> {ecv}
          </p>
        )}
      </div>
      {error && <p className="error">{error}</p>}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
};

export default EcvCalculator;
