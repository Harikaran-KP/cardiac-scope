import React, { useState } from "react";
import styles from "./ImageUpload.module.css";
import axios from "../../Services/axiosConfig";

const ImageUpload = () => {
  // Define states for each file
  const [esNiiFile, setEsNiiFile] = useState(null);
  const [edNiiFile, setEdNiiFile] = useState(null);
  const [cfgFile, setCfgFile] = useState(null);

  // State for server response
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handlers for each file input
  const handleEsNiiFileChange = (e) => {
    setEsNiiFile(e.target.files[0]);
  };

  const handleEdNiiFileChange = (e) => {
    setEdNiiFile(e.target.files[0]);
  };

  const handleCfgFileChange = (e) => {
    setCfgFile(e.target.files[0]);
  };

  // Upload function
  const upload = async () => {
    // Function to upload files to node server using axios
    const formData = new FormData();
    formData.append("es_nii_file", esNiiFile);
    formData.append("ed_nii_file", edNiiFile);
    formData.append("cfg_file", cfgFile);

    try {
      const response = await axios.post("/api/auth/handleUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Server Response:", response.data);
      setResponseData(response.data); // Store response data in state
      setErrorMessage(""); // Clear any error messages
    } catch (error) {
      console.error("Error uploading files:", error);
      setErrorMessage("Error uploading files. Please try again.");
    }
  };

  // Calculate LVEF, LVSV, and Indexed volumes
  const calculateMetrics = (lvEdv, lvEsv, bsa) => {
    const lvEf = ((lvEdv - lvEsv) / lvEdv) * 100; // LVEF %
    const lvSv = lvEdv - lvEsv; // LVSV
    const lvEdvi = lvEdv / bsa; // LVEDVi
    const lvEsvi = lvEsv / bsa; // LVESVi

    return { lvEf, lvSv, lvEdvi, lvEsvi };
  };

  return (
    <div className={styles["image-upload-container"]}>
      <div className={styles["top-bar"]}>
        <h1>
          <b>Image Upload</b>
        </h1>
      </div>
      <div className={styles["upload-block"]}>
        <label>ES Nii File</label>
        <input
          type="file"
          onChange={handleEsNiiFileChange}
          accept=".nii,.nii.gz"
        />
        <br />
        <br />

        <label>ED Nii File</label>
        <input
          type="file"
          onChange={handleEdNiiFileChange}
          accept=".nii,.nii.gz"
        />
        <br />
        <br />

        <label>Info File</label>
        <input type="file" onChange={handleCfgFileChange} accept=".cfg" />
        <br />
        <br />

        <button onClick={upload}>Upload</button>

        {/* Show error message if there is one */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        {/* Display response data after upload */}
        {responseData && (
          <div className={styles["response-block"]}>
            <p>
              <strong>BSA:</strong> {responseData.bsa_result[1]}
            </p>

            {/* LV Metrics */}
            <h4>LV Metrics</h4>
            {(() => {
              const lvEdv =
                responseData.result.ed_metrics.find(
                  (metric) => metric.Class === 1
                )?.["Volume Pred"] || 0;
              const lvEsv =
                responseData.result.es_metrics.find(
                  (metric) => metric.Class === 1
                )?.["Volume Pred"] || 0;
              const bsa = responseData.bsa_result[1];

              const { lvEf, lvSv, lvEdvi, lvEsvi } = calculateMetrics(
                lvEdv,
                lvEsv,
                bsa
              );

              return (
                <>
                  <p>LVEDV: {lvEdv}</p>
                  <p>LVESV: {lvEsv}</p>
                  <p>LVEF: {lvEf.toFixed(2)}%</p>
                  <p>LVSV: {lvSv.toFixed(2)}</p>
                  <p>LVEDVi: {lvEdvi.toFixed(2)}</p>
                  <p>LVESVi: {lvEsvi.toFixed(2)}</p>
                </>
              );
            })()}

            {/* RV Metrics */}
            <h4>RV Metrics</h4>
            {(() => {
              const rvEdv =
                responseData.result.ed_metrics.find(
                  (metric) => metric.Class === 2
                )?.["Volume Pred"] || 0;
              const rvEsv =
                responseData.result.es_metrics.find(
                  (metric) => metric.Class === 2
                )?.["Volume Pred"] || 0;
              const bsa = responseData.bsa_result[1];

              const {
                lvEf: rvEf,
                lvSv: rvSv,
                lvEdvi: rvEdvi,
                lvEsvi: rvEsvi,
              } = calculateMetrics(rvEdv, rvEsv, bsa);

              return (
                <>
                  <p>RVEDV: {rvEdv}</p>
                  <p>RVESV: {rvEsv}</p>
                  <p>RVEF: {rvEf.toFixed(2)}%</p>
                  <p>RVSV: {rvSv.toFixed(2)}</p>
                  <p>RVEDVi: {rvEdvi.toFixed(2)}</p>
                  <p>RVESVi: {rvEsvi.toFixed(2)}</p>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
