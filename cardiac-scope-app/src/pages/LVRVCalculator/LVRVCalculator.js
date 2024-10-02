import React, { useState, useEffect } from "react";
import styles from "./LVRV.module.css";
import { useLVRV } from "../../Context/LVRVContext/lvrvContext";
import { useProfile } from "../../Context/ProfileContext/profileContext";

const LVRVCalculator = () => {
  const {
    publicationRef,
    setPublicationRef,
    references,
    fetchReferences,
    age,
    setAge,
    gender,
    setGender,
    lvrvData,
    updateLVRVData,
    savePublicationPreference,
  } = useLVRV();

  const { profile, updateProfile } = useProfile();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bsa, setBsa] = useState("");
  const [genderState, setGenderState] = useState("Male");
  const [lvedv, setLvedv] = useState("");
  const [lvesv, setLvesv] = useState("");
  const [lvm, setLvm] = useState("");
  const [lvsv, setLvsv] = useState("");
  const [rvedv, setRvedv] = useState("");                                   //states for all the input fields and reference valus
  const [rvesv, setRvesv] = useState("");
  const [rvm, setRvm] = useState("");
  const [rvsv, setRvsv] = useState("");
  const [lav_min, setLav_min] = useState("");
  const [lav_max, setLav_max] = useState("");
  const [rav_min, setRav_min] = useState("");
  const [rav_max, setRav_max] = useState("");
  const [lavi_min, setLavi_min] = useState("");
  const [lavi_max, setLavi_max] = useState("");
  const [ravi_min, setRavi_min] = useState("");
  const [ravi_max, setRavi_max] = useState("");
  const [lav, setLav] = useState("");
  const [rav, setRav] = useState("");
  const [lad, setLad] = useState("");
  const [raArea, setRaArea] = useState("");
  const [rwm, setRwm] = useState("");
  const [rwt, setRwt] = useState("");
  const [publicationRefId, setPublicationRefId] = useState();
  const [includeAppendage, setIncludeAppendage] = useState(true);
  const [showCalculatedValues, setShowCalculatedValues] = useState(false);
  const [lvedviStatus, setLvedviStatus] = useState("");
  const [rvedviStatus, setRvedviStatus] = useState("");
  const [laviStatus, setLaviStatus] = useState("");
  const [raviStatus, setRaviStatus] = useState("");
  const [lvefStatus, setLvefStatus] = useState("");
  const [rvefStatus, setRvefStatus] = useState("");
  const [lvmiStatus, setLvmiStatus] = useState("");

  useEffect(() => {
    if (height && weight) {
      const calculatedBsa = Math.sqrt((height * weight) / 3600).toFixed(2);
      setBsa(calculatedBsa);
    } else {
      setBsa("");
    }
  }, [height, weight]);

  useEffect(() => {
    const canFetchReferences = () => {
      return publicationRef && gender && age;              
    };

    if (canFetchReferences()) {                                             //consuming data from context file, reference ranges
      fetchReferences(publicationRef, gender, age);
    }
  }, [publicationRef, gender, age]);

  const handleSavePublication = () => {
    savePublicationPreference(publicationRefId);
    console.log("Test:", publicationRefId);
  };

  const calculateLvedviStatus = (lvedvi, lvedvi_min, lvedvi_max) => {
    if (lvedvi > lvedvi_max) {
      setLvedviStatus("is dilated");
    } else if (lvedvi < lvedvi_min) {                                         //LVEDVi status -  a function
      setLvedviStatus("is small");
    } else {
      setLvedviStatus("is of normal size");
    }
  };

  const calculateRvedviStatus = (Rvedvi, Rvedvi_min, Rvedvi_max) => {
    if (Rvedvi > Rvedvi_max) {
      setRvedviStatus("is dilated");
    } else if (Rvedvi < Rvedvi_min) {
      setRvedviStatus("is small");                            //RVEDVi status -  a function
    } else {
      setRvedviStatus("is of normal size");
    }
  };

  const calculateLaviStatus = (lavi, lavi_min, lavi_max) => {
    if (lavi > lavi_max) {
      setLaviStatus("is dilated");
    } else if (lavi < lavi_min) {                             //laVi status -  a function
      setLaviStatus("is small");
    } else {
      setLaviStatus("is of normal size");
    }
  };

  const calculateRaviStatus = (Ravi, Ravi_min, Ravi_max) => {
    if (Ravi > Ravi_max) {
      setRaviStatus("is dilated");
    } else if (Ravi < Ravi_min) {
      setRaviStatus("is small");
    } else {
      setRaviStatus("is of normal size");
    }
  };

  const calculateLvefStatus = (lvef, lvef_min, lvef_max) => {
    if (lvef >= lvef_min && lvef <= lvef_max) {
      setLvefStatus("good global systolic function");
    } else if (lvef > lvef_max) {
      setLvefStatus("hyper dynamic systolic function");
    } else if (lvef < lvef_min) {
      if (lvef >= 45) {
        setLvefStatus("overall mildly reduced global systolic function");
      } else if (lvef >= 35 && lvef < 45) {
        setLvefStatus("overall moderately reduced global systolic function");
      } else if (lvef < 35) {
        setLvefStatus("overall severely reduced global systolic function");
      }
    }
  };

  const calcualateRvefStatus = (rvef, rvef_min, rvef_max) => {
    if (rvef >= rvef_min && rvef <= rvef_max) {
      setRvefStatus("good global systolic function");
    } else if (rvef < rvef_min) {
      setRvefStatus("impaired systolic function");
    }
  };

  const calculateLvmiStatus = (lvmi, lvmi_min, lvmi_max, rwm, rwt) => {
    if (lvmi < lvmi_min) {
      setLvmiStatus("reduced myocardial mass");
    } else if (lvmi >= lvmi_min && lvmi <= lvmi_max) {
      setLvmiStatus("normal myocardial mass");
    } else if (lvmi > lvmi_max) {
      if (rwm < 1.6 || rwt < 0.42) {
        setLvmiStatus("eccentric hypertrophy");
      } else if (rwm > 1.6 || rwt > 0.42) {
        setLvmiStatus("concentric hypertrophy");
      }
    }
  };

  const handleCalculate = () => {
    if (!height || !weight || !lvedv || !lvesv || !rvedv || !rvesv) {
      alert("Please fill in all necessary fields.");
      return;
    }
    setShowCalculatedValues(true);

    if (publicationRef !== 2) {
      calculateLaviStatus(
        calculateIndex(lav),
        references[0].lavi_min,
        references[0].lavi_max
      );
      calculateRaviStatus(
        calculateIndex(rav),
        references[0].ravi_min,
        references[0].ravi_max
      );
    } else if (publicationRef === 2) {
      if (includeAppendage) {
        calculateLaviStatus(
          calculateIndex(lav),
          references[0].lavi_min_inc,
          references[0].lavi_max_inc
        );
        calculateRaviStatus(
          calculateIndex(rav),
          references[0].ravi_min_inc,
          references[0].ravi_max_inc
        );
      } else if (!includeAppendage) {
        calculateLaviStatus(
          calculateIndex(lav),
          references[0].lavi_min_exc,
          references[0].lavi_max_exc
        );
        calculateRaviStatus(
          calculateIndex(rav),
          references[0].ravi_min_exc,
          references[0].ravi_max_exc
        );
      }
    }

    calculateLvedviStatus(
      calculateIndex(lvedv),
      references[0].lvedvi_min,
      references[0].lvedvi_max
    );
    calculateRvedviStatus(
      calculateIndex(rvedv),
      references[0].rvedvi_min,
      references[0].rvedvi_max
    );
    calculateLvefStatus(
      calculateLVEF(),
      references[0].lvef_min,
      references[0].lvef_max
    );
    calcualateRvefStatus(
      calculateRVEF(),
      references[0].rvef_min,
      references[0].rvef_max
    );
    calculateLvmiStatus(
      calculateIndex(lvm),
      references[0].lvmi_min,
      references[0].lvmi_max,
      rwm,
      rwt
    );
  };

  const handleSave = () => {
    const data = {
      age,
      height,
      weight,
      gender,
      genderState,
      lvedv,
      lvedv_min: references[0].lvedv_min,
      lvedv_max: references[0].lvedv_max,
      lvedvi: calculateIndex(lvedv),
      lvedvi_min: references[0].lvedvi_min,
      lvedvi_max: references[0].lvedvi_max,
      lvesv,
      lvesv_min: references[0].lvesv_min,
      lvesv_max: references[0].lvesv_max,
      lvesvi: calculateIndex(lvesv),
      lvesvi_min: references[0].lvesvi_min,
      lvesvi_max: references[0].lvesvi_max,
      lvm,
      lvm_min: references[0].lvm_min,
      lvm_max: references[0].lvm_max,
      lvmi: calculateIndex(lvm),
      lvmi_min: references[0].lvmi_min,
      lvmi_max: references[0].lvmi_max,
      lvsv,
      lvsv_min: references[0].lvsv_min,
      lvsv_max: references[0].lvsv_max,
      lvef: calculateLVEF(),
      lvef_min: references[0].lvef_min,
      lvef_max: references[0].lvm_max,
      rvedv,
      rvedv_min: references[0].rvedv_min,
      rvedv_max: references[0].rvedv_max,
      rvedvi: calculateIndex(rvedv),
      rvedvi_min: references[0].rvedvi_min,
      rvedvi_max: references[0].lvedvi_max,
      rvesv,
      rvesv_min: references[0].rvesv_min,
      rvesv_max: references[0].rvesv_max,
      rvesvi: calculateIndex(rvesv),
      rvesvi_min: references[0].rvesvi_min,
      rvesvi_max: references[0].rvesvi_max,
      // rvm,
      // rvm_min: references[0].rvm_min,
      // rvm_max: references[0].rvm_max,
      // rvmi: calculateIndex(rvm),
      // rvmi_min: references[0].rvmi_min,
      // rvmi_max: references[0].rvmi_max,
      rvsv,
      rvsv_min: references[0].rvsv_min,
      rvsv_max: references[0].rvsv_max,
      rvef: calculateRVEF(),
      rvef_min: references[0].rvef_min,
      rvef_max: references[0].rvef_max,
      lav,
      lavi: calculateIndex(lav),
      rav,
      ravi: calculateIndex(rav),
      lad,
      raArea,
      laviStatus,
      lvedviStatus,
      raviStatus,
      rvedviStatus,
      lvefStatus,
      rvefStatus,
    };
    localStorage.setItem("LVRVData", JSON.stringify(data));
    console.log("LVRV data: ", data);
    savePublicationPreference(publicationRefId);
    alert("Data saved successfully.");
  };

  console.log(references[0])

  const filterReferences = (includeAppendage, references) => {
    if (!references) return [];
    return references.map((ref) => {
      if (includeAppendage) {
        return {
          ...ref,
          lav_min: ref.lav_min_inc,
          lav_max: ref.lav_max_inc,
          rav_min: ref.rav_min_inc,
          rav_max: ref.rav_max_inc,
          lavi_min: ref.lav_min_inc,
          lavi_max: ref.lav_max_inc,
          ravi_min: ref.rav_min_inc,
          ravi_max: ref.rav_max_inc,
        };
      } else {
        return {
          ...ref,
          lav_min: ref.lav_min_exc,
          lav_max: ref.lav_max_exc,
          rav_min: ref.rav_min_exc,
          rav_max: ref.rav_max_exc,
          lavi_min: ref.lav_min_exc,
          lavi_max: ref.lav_max_exc,
          ravi_min: ref.rav_min_exc,
          ravi_max: ref.rav_max_exc,
        };
      }
    });
  };

  const filteredReferences = filterReferences(includeAppendage, references);

  const pubChange = (val) => {
    setPublicationRef(val.target.value);
    console.log(publicationRef);
  };

  const handleFetchReferences = () => {
    fetchReferences(publicationRefId, gender, age);
  };

  const calculateIndex = (value) => (bsa ? (value / bsa).toFixed(2) : "");

  const calculateLVEF = () => {
    if (lvedv && lvesv) {
      return (((lvedv - lvesv) / lvedv) * 100).toFixed(2);
    }
    return "";
  };

  const calculateRVEF = () => {
    if (rvedv && rvesv) {
      return (((rvedv - rvesv) / rvedv) * 100).toFixed(2);
    }
    return "";
  };

  useEffect(() => {
    if (publicationRef && gender && age) {
      fetchReferences(publicationRef, gender, age);
    }
  }, [publicationRef, gender, age, fetchReferences]);

  const toggleContent = (index) => {
    const content = document.getElementById(`expandable-content-${index}`);
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  };

  return (
    <div className={styles["lv-rv-container"]}>
      <div className="top-bar">
        <h1>
          <b>LV & RV Calculator</b>
        </h1>
      </div>

      <div className={styles["calculator-block"]}>
        <div className={styles["details-container"]}>
          <div className={styles["sub-container"]}>
            <form
              className={styles["form-block"]}
              onSubmit={(e) => {
                e.preventDefault();
                console.log();
              }}
            >
              <div className={styles["input-block-bar"]}>
                <div className="input-group">
                  <label htmlFor="publication">Publication</label>
                  <select
                    id="publication"
                    name="publication"
                    value={publicationRef}
                    onChange={(e) => {
                      pubChange(e);
                    }}
                    required
                  >
                    <option value={1}>2006 Maceira et al.</option>
                    <option value={2}>2020 Kawel-Boehm et al.</option>
                    <option value={3}>2015 Kawel-Boehm et al.</option>
                    <option value={4}>Petersen et al.</option>
                  </select>
                </div>
                {/* <button
                type="button"
                onClick={handleSavePublication}
                className="btn btn-primary"
              >
                Save Publication Preference
              </button> */}

                <div className="input-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      setGenderState(
                        e.target.value === "1" ? "Male" : "Female"
                      );
                    }}
                    required
                  >
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
                {/* <button
                type="button"
                onClick={handleFetchReferences}
                className="btn btn-primary"
              >
                Fetch
              </button> */}
              </div>
              {parseInt(publicationRef) === 2 && (
                <div className="input-group">
                  <label>Appendage Inclusion</label>
                  <div className={styles["input-block-bar"]}>
                    <div className="input-group">
                      <label>
                        <input
                          type="radio"
                          name="appendage"
                          value="include"
                          checked={includeAppendage}
                          onChange={() => setIncludeAppendage(true)}
                        />
                        Include LA/RA Appendage
                      </label>
                    </div>
                    <div className="input-group">
                      <label>
                        <input
                          type="radio"
                          name="appendage"
                          value="exclude"
                          checked={!includeAppendage}
                          onChange={() => setIncludeAppendage(false)}
                        />
                        Exclude LA/RA Appendage
                      </label>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles["input-block-bar"]}>
                <div className="input-group">
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="bsa">Body Surface Area (m²)</label>
                  <input type="text" id="bsa" name="bsa" value={bsa} readOnly />
                </div>
              </div>
              <div className={styles["input-block-bar"]}>
                <div className="input-group">
                  <label htmlFor="lvedv">LVEDV</label>
                  <input
                    type="text"
                    id="lvedv"
                    name="lvedv"
                    value={lvedv}
                    onChange={(e) => setLvedv(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lvesv">LVESV</label>
                  <input
                    type="text"
                    id="lvesv"
                    name="lvesv"
                    value={lvesv}
                    onChange={(e) => setLvesv(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lvm">LVM</label>
                  <input
                    type="text"
                    id="lvm"
                    name="lvm"
                    value={lvm}
                    onChange={(e) => setLvm(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lvsv">LVSV</label>
                  <input
                    type="text"
                    id="lvsv"
                    name="lvsv"
                    value={lvsv}
                    onChange={(e) => setLvsv(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles["input-block-bar"]}>
                <div className="input-group">
                  <label htmlFor="rvedv">RVEDV</label>
                  <input
                    type="text"
                    id="rvedv"
                    name="rvedv"
                    value={rvedv}
                    onChange={(e) => setRvedv(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="rvesv">RVESV</label>
                  <input
                    type="text"
                    id="rvesv"
                    name="rvesv"
                    value={rvesv}
                    onChange={(e) => setRvesv(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="rvm">RVM</label>
                  <input
                    type="text"
                    id="rvm"
                    name="rvm"
                    value={rvm}
                    onChange={(e) => setRvm(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="rvsv">RVSV</label>
                  <input
                    type="text"
                    id="rvsv"
                    name="rvsv"
                    value={rvsv}
                    onChange={(e) => setRvsv(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles["input-block-bar"]}>
                <div className="input-group">
                  <label htmlFor="lav">LAV</label>
                  <input
                    type="text"
                    id="lav"
                    name="lav"
                    value={lav}
                    onChange={(e) => setLav(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="rav">RAV</label>
                  <input
                    type="text"
                    id="rav"
                    name="rav"
                    value={rav}
                    onChange={(e) => setRav(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="lad">LA Diameter</label>
                  <input
                    type="text"
                    id="lad"
                    name="lad"
                    value={lad}
                    onChange={(e) => setLad(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="raArea">RA Area</label>
                  <input
                    type="text"
                    id="raArea"
                    name="raArea"
                    value={raArea}
                    onChange={(e) => setRaArea(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles["input-block-bar"]}>
                <div className="input-group">
                  <label htmlFor="rwm">RWM</label>
                  <input
                    type="text"
                    id="rwm"
                    name="rwm"
                    value={rwm}
                    onChange={(e) => setRwm(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="rwt">RW</label>
                  <input
                    type="text"
                    id="rwt"
                    name="rwt"
                    value={rwt}
                    onChange={(e) => setRwt(e.target.value)}
                  />
                </div>
                <div className="input-group"></div>
                <div className="input-group"></div>
              </div>
              {/* {parseInt(publicationRef) === 2 && (
                <div className={styles["input-block-bar"]}>
                  <div className="input-group">
                    <label htmlFor="lav_min">LAV Min</label>
                    <input
                      type="text"
                      id="lav_min"
                      name="lav_min"
                      value={lav_min}
                      onChange={(e) => setLav_min(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="lav_max">LAV Max</label>
                    <input
                      type="text"
                      id="lav_max"
                      name="lav_max"
                      value={lav_max}
                      onChange={(e) => setLav_max(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="rav_min">RAV Min</label>
                    <input
                      type="text"
                      id="rav_min"
                      name="rav_min"
                      value={rav_min}
                      onChange={(e) => setRav_min(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="rav_max">RAV Max</label>
                    <input
                      type="text"
                      id="rav_max"
                      name="rav_max"
                      value={rav_max}
                      onChange={(e) => setRav_max(e.target.value)}
                    />
                  </div>
                </div>
              )} */}
              <div className={styles["input-block-bar"]}>
                <button type="button" className="btn" onClick={handleCalculate}>
                  Calculate
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </form>
            {showCalculatedValues && (
              <div className={styles["calculated-values"]}>
                {lvedv && <p>LVEDVi: {calculateIndex(lvedv)}</p>}
                {lvesv && <p>LVESVi: {calculateIndex(lvesv)}</p>}
                {lvm && <p>LVMi: {calculateIndex(lvm)}</p>}
                {lvsv && <p>LVSVi: {calculateIndex(lvsv)}</p>}
                {rvedv && <p>RVEDVi: {calculateIndex(rvedv)}</p>}
                {rvesv && <p>RVESVi: {calculateIndex(rvesv)}</p>}
                {rvm && <p>RVMi: {calculateIndex(rvm)}</p>}
                {rvsv && <p>RVSVi: {calculateIndex(rvsv)}</p>}
                {lvedv && lvesv && <p>LVEF: {calculateLVEF()}</p>}
                {rvedv && rvesv && <p>RVEF: {calculateRVEF()}</p>}
                {lav_min && <p>LAVi Min: {calculateIndex(lav_min)}</p>}
                {lav_max && <p>LAVi Max: {calculateIndex(lav_max)}</p>}
                {rav_min && <p>RAVi Min: {calculateIndex(rav_min)}</p>}
                {rav_max && <p>RAVi Max: {calculateIndex(rav_max)}</p>}
                {lav && <p>LAVi: {calculateIndex(lav)}</p>}
                {rav && <p>RAVi: {calculateIndex(rav)}</p>}
              </div>
            )}
          </div>
        </div>

        <div className={styles["reference-container"]}>
          <h2>Reference Tables</h2>
          {references[0] !== undefined ? (
            <div className={styles["references"]}>
              <div className={styles["reference-group"]}>
                <p>
                  LVEDV: {references[0]?.lvedv} (min: {references[0]?.lvedv_min}
                  , max: {references[0]?.lvedv_max})
                </p>
                <p>
                  LVEDVi: {references[0]?.lvedvi} (min:{" "}
                  {references[0]?.lvedvi_min}, max: {references[0]?.lvedvi_max})
                </p>
      
                <p>
                  LVESV: {references[0]?.lvesv} (min: {references[0]?.lvesv_min}
                  , max: {references[0]?.lvesv_max})
                </p>
                <p>
                  LVESVi: {references[0]?.lvesvi} (min:{" "}
                  {references[0]?.lvesvi_min}, max: {references[0]?.lvesvi_max})
                </p>
                <p>
                  LVM: {references[0]?.lvm} (min: {references[0]?.lvm_min}, max:{" "}
                  {references[0]?.lvm_max})
                </p>
                <p>
                  LVMi: {references[0]?.lvmi} (min: {references[0]?.lvmi_min},
                  max: {references[0]?.lvmi_max})
                </p>
                <p>
                  LVSV: {references[0]?.lvsv} (min: {references[0]?.lvsv_min},
                  max: {references[0]?.lvsv_max})
                </p>
                <p>
                  LVSVi: {references[0]?.lvsvi} (min: {references[0]?.lvsvi_min}
                  , max: {references[0]?.lvsvi_max})
                </p>
                <p>
                  LVEF: {references[0]?.lvef} (min: {references[0]?.lvef_min},
                  max: {references[0]?.lvef_max})
                </p>
                <p>
                  RVEDV: {references[0]?.rvedv} (min: {references[0]?.rvedv_min}
                  , max: {references[0]?.rvedv_max})
                </p>
                <p>
                  RVEDVi: {references[0]?.rvedvi} (min:{" "}
                  {references[0]?.rvedvi_min}, max: {references[0]?.rvedvi_max})
                </p>
                <p>
                  RVESV: {references[0]?.rvesv} (min: {references[0]?.rvesv_min}
                  , max: {references[0]?.rvesv_max})
                </p>
                <p>
                  RVESVi: {references[0]?.rvesvi} (min:{" "}
                  {references[0]?.rvesvi_min}, max: {references[0]?.rvesvi_max})
                </p>
                <p>
                  RVM: {references[0]?.rvm} (min: {references[0]?.rvm_min}, max:{" "}
                  {references[0]?.rvm_max})
                </p>
                <p>
                  RVMi: {references[0]?.rvmi} (min: {references[0]?.rvmi_min},
                  max: {references[0]?.rvmi_max})
                </p>
                <p>
                  RVEF: {references[0]?.rvef} (min: {references[0]?.rvef_min},
                  max: {references[0]?.rvef_max})
                </p>
              </div>

              {parseInt(publicationRef) === 2 ? (
                <>
                  <div className={styles["reference-group"]}>
                    <h3>
                      LAV & LAVi{" "}
                      {includeAppendage
                        ? "(Include Appendage)"
                        : "(Exclude Appendage)"}
                    </h3>
                    {includeAppendage ? (
                      <p>
                        LAVi: {references[0]?.lavi_min_inc} -{" "}
                        {references[0]?.lavi_max_inc}
                      </p>
                    ) : (
                      <p>
                        LAVi: {references[0]?.lavi_min_exc} -{" "}
                        {references[0]?.lavi_max_exc}
                      </p>
                    )}
                  </div>

                  <div className={styles["reference-group"]}>
                    <h3>
                      RAV & RAVi{" "}
                      {includeAppendage
                        ? "(Include Appendage)"
                        : "(Exclude Appendage)"}
                    </h3>
                    {includeAppendage ? (
                      <p>
                        RAVi: {references[0]?.ravi_min_inc} -{" "}
                        {references[0]?.ravi_max_inc}
                      </p>
                    ) : (
                      <p>
                        RAVi: {references[0]?.ravi_min_exc} -{" "}
                        {references[0]?.ravi_max_exc}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className={styles["reference-group"]}>
                    <h3>LAV & LAVi </h3>
                    <p>
                      LAVi: {references[0]?.lavi_min} -{" "}
                      {references[0]?.lavi_max}
                    </p>
                  </div>

                  <div className={styles["reference-group"]}>
                    <h3>RAV & RAVi </h3>
                    <p>
                      RAVi: {references[0]?.ravi_min} -{" "}
                      {references[0]?.ravi_max}
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (<p>No data to show!</p>)}
        </div>
      </div>
    </div>
  );
};

export default LVRVCalculator;
