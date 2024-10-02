import React, { useState, useEffect } from "react";
import { useStrain } from "../../Context/SrainContext/strainContext";
import styles from "./Strain.module.css";
import { useLVRV } from "../../Context/LVRVContext/lvrvContext";
import { DownArrowSvg } from "../../SVG/DownArrowSvg";
import { UpArrowSvg } from "../../SVG/UpArrowSvg";
import { LevelArrow } from "../../SVG/LevelArrow";

const StrainCalculator = () => {
  const { cmrTechniques, cmrTechniqueReferences } = useStrain();
  const [gender, setGender] = useState(1);
  const [technique, setTechnique] = useState(1);
  const [cmr, setCmr] = useState([]);
  const [cmrReferences, setCmrReferences] = useState([]);
  const [c_level, setCLevel] = useState("");
  const [l_level, setLLevel] = useState("");

  useEffect(() => {
    setCmr(cmrTechniques);
    setCmrReferences(cmrTechniqueReferences);
  }, [cmrTechniqueReferences, cmrTechniques]);

  //Strain Page calculations

  const checkLevel = (type, value, lowerValue, upperValue) => {
    if (value && lowerValue && upperValue) {
      if (type === "c") {
        if (value > lowerValue && value < upperValue) {
          setCLevel("level");
        } else if (value > lowerValue && value > upperValue) {
          setCLevel("high");
        } else if (value < lowerValue && value < upperValue) {
          setCLevel("low");
        }
      } else {
        setCLevel("");
      }
    } else if (type === "l") {
      if (value > lowerValue && value < upperValue) {
        setLLevel("level");
      } else if (value > lowerValue && value > upperValue) {
        setLLevel("high");
      } else if (value < lowerValue && value < upperValue) {
        setLLevel("low");
      } else {
        setLLevel("");
      }
    }
  };

  return (
    <div className={styles["strain-container"]}>
      <div className="top-bar">
        <h1>
          <b>Strain</b>
        </h1>
      </div>

      <div className={styles["details-container"]}>
        <div className={styles["sub-container"]}>
          <div className="input-block-bar">
            <div className="input-group">
              <label htmlFor="cmrTechnique">CMR Technique</label>
              <select
                id="cmrTechnique"
                name="cmrTechnique"
                value={technique}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTechnique(e.target.value);
                }}
                required
              >
                {cmr?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.cmr_technique}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-block-bar">
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </select>
            </div>
          </div>

          <div className="input-block-bar">
            <label htmlFor="circumferentialStrain">
              Circumferential Strain
            </label>
            <input
              type="number"
              id="circumferentialStrain"
              name="circumferentialStrain"
              onChange={(e) => {
                console.log(e.target.value);
                checkLevel(
                  "c",
                  e.target.value,
                  cmrTechniqueReferences[gender * technique - 1]?.c_strain_min,
                  cmrTechniqueReferences[gender * technique - 1]?.c_strain_max
                );
              }}
              required
            />
            {"%"}
            {c_level === "low" ? (
              <DownArrowSvg />
            ) : c_level === "high" ? (
              <UpArrowSvg />
            ) : c_level === "level" ? (
              <LevelArrow />
            ) : null}
          </div>
          <div className="input-block-bar">
            <label htmlFor="longitudinalStrain">Longitudinal strain</label>
            <input
              type="number"
              id="longitudinalStrain"
              name="longitudinalStrain"
              onChange={(e) => {
                console.log(e.target.value);
                checkLevel(
                  "l",
                  e.target.value,
                  cmrTechniqueReferences[gender * technique - 1]?.l_strain_min,
                  cmrTechniqueReferences[gender * technique - 1]?.l_strain_max
                );
              }}
              required
            />
            {"%"}
            {l_level === "low" ? (
              <DownArrowSvg />
            ) : l_level === "high" ? (
              <UpArrowSvg />
            ) : l_level === "level" ? (
              <LevelArrow />
            ) : null}
          </div>
        </div>
        <div className={styles["sub-container"]}>
          <div>Using Tagging technique</div>
          <div>Men</div>
          <div>
            {cmrTechniqueReferences?.[0] && (
              <>
                <p>
                  Circumferential Strain:{" "}
                  {cmrTechniqueReferences[0].c_strain_min} -
                  {cmrTechniqueReferences[0].c_strain_max}
                </p>
                <p>
                  Longitudinal Strain: {cmrTechniqueReferences[0].l_strain_min}{" "}
                  -{cmrTechniqueReferences[0].l_strain_max}
                </p>
              </>
            )}
          </div>
          <div>Women</div>
          <div>
            {cmrTechniqueReferences?.[1] && (
              <>
                <p>
                  Circumferential Strain:{" "}
                  {cmrTechniqueReferences[1].c_strain_min} -
                  {cmrTechniqueReferences[1].c_strain_max}
                </p>
                <p>
                  Longitudinal Strain: {cmrTechniqueReferences[1].l_strain_min}{" "}
                  -{cmrTechniqueReferences[1].l_strain_max}
                </p>
              </>
            )}
          </div>

          <div>Using 2D-FT technique</div>
          <div>Men</div>
          <div>
            {cmrTechniqueReferences?.[2] && (
              <>
                <p>
                  Circumferential Strain:{" "}
                  {cmrTechniqueReferences[2].c_strain_min} -
                  {cmrTechniqueReferences[2].c_strain_max}
                </p>
                <p>
                  Longitudinal Strain: {cmrTechniqueReferences[2].l_strain_min}{" "}
                  -{cmrTechniqueReferences[2].l_strain_max}
                </p>
              </>
            )}
          </div>
          <div>Women</div>
          <div>
            {cmrTechniqueReferences?.[3] && (
              <>
                <p>
                  Circumferential Strain:{" "}
                  {cmrTechniqueReferences[3].c_strain_min} -
                  {cmrTechniqueReferences[3].c_strain_max}
                </p>
                <p>
                  Longitudinal Strain: {cmrTechniqueReferences[3].l_strain_min}{" "}
                  -{cmrTechniqueReferences[3].l_strain_max}
                </p>
              </>
            )}
          </div>

          <div>Using 3D-FT technique</div>
          <div>Men</div>
          <div>
            {cmrTechniqueReferences?.[4] && (
              <>
                <p>
                  Circumferential Strain:{" "}
                  {cmrTechniqueReferences[4].c_strain_min} -
                  {cmrTechniqueReferences[4].c_strain_max}
                </p>
                <p>
                  Longitudinal Strain: {cmrTechniqueReferences[4].l_strain_min}{" "}
                  -{cmrTechniqueReferences[4].l_strain_max}
                </p>
              </>
            )}
          </div>
          <div>Women</div>
          <div>
            {cmrTechniqueReferences?.[5] && (
              <>
                <p>
                  Circumferential Strain:{" "}
                  {cmrTechniqueReferences[5].c_strain_min} -
                  {cmrTechniqueReferences[5].c_strain_max}
                </p>
                <p>
                  Longitudinal Strain: {cmrTechniqueReferences[5].l_strain_min}{" "}
                  -{cmrTechniqueReferences[5].l_strain_max}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrainCalculator;
