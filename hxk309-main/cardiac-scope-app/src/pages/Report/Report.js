import React, { useState, useEffect } from "react";
import styles from "../Report/Report.module.css";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Document, Packer, Paragraph, TextRun } from "docx";

const ReportPage = () => {
  const [data, setData] = useState({});
  const [conclusion, setConclusion] = useState("");
  const [protocol, setProtocol] = useState("");
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");
  const [doctorInfo, setDoctorInfo] = useState({
    firstName: "",
    lastName: "",
    title: "",
  });
  const [reportData, setReportData] = useState();

  const [wallMotion, setWallMotion] = useState({
    wallMotion1: 0,
    wallMotion2: 0,
    wallMotion3: 0,
    wallMotion4: 0,
    wallMotion5: 0,
    wallMotion6: 0,
    wallMotion7: 0,
    wallMotion8: 0,
    wallMotion9: 0,
    wallMotion10: 0,
    wallMotion11: 0,
    wallMotion12: 0,
    wallMotion13: 0,
    wallMotion14: 0,
    wallMotion15: 0,
    wallMotion16: 0,
  });
  const [scar, setScar] = useState({
    scar1: 0,
    scar2: 0,
    scar3: 0,
    scar4: 0,
    scar5: 0,
    scar6: 0,
    scar7: 0,
    scar8: 0,
    scar9: 0,
    scar10: 0,
    scar11: 0,
    scar12: 0,
    scar13: 0,
    scar14: 0,
    scar15: 0,
    scar16: 0,
  });

  const options = [0, 1, 2, 3, 4, 5];

  const handleWallMotionChange = (index, value) => {
    setWallMotion((prevState) => ({ ...prevState, [index]: value }));
  };

  const handleScarChange = (index, value) => {
    setScar((prevState) => ({ ...prevState, [index]: value }));
  };

  const getCombinedData = () => {
    //Saved values are returned from local storage
    const lvrvData = JSON.parse(localStorage.getItem("LVRVData")) || {};
    const ecvData = JSON.parse(localStorage.getItem("ecvInputs")) || {};
    const ecv = JSON.parse(localStorage.getItem("ecvData")) || {};
    return {
      ...lvrvData,
      ...ecvData,
      ...ecv,
      conclusion,
      protocol,
      reason,
      comment,
      doctorFirstName: doctorInfo.firstName,
      doctorLastName: doctorInfo.lastName,
      doctorTitle: doctorInfo.title,
      wallMotion1: wallMotion.wallMotion1,
      wallMotion2: wallMotion.wallMotion2,
      wallMotion3: wallMotion.wallMotion3,
      wallMotion4: wallMotion.wallMotion4,
      wallMotion5: wallMotion.wallMotion5,
      wallMotion6: wallMotion.wallMotion6,
      wallMotion7: wallMotion.wallMotion7,
      wallMotion8: wallMotion.wallMotion8,
      wallMotion9: wallMotion.wallMotion9,
      wallMotion10: wallMotion.wallMotion10,
      wallMotion11: wallMotion.wallMotion11,
      wallMotion12: wallMotion.wallMotion12,
      wallMotion13: wallMotion.wallMotion13,
      wallMotion14: wallMotion.wallMotion14,
      wallMotion15: wallMotion.wallMotion15,
      wallMotion16: wallMotion.wallMotion16,
      scar1: scar.scar1,
      scar2: scar.scar2,
      scar3: scar.scar3,
      scar4: scar.scar4,
      scar5: scar.scar5,
      scar6: scar.scar6,
      scar7: scar.scar7,
      scar8: scar.scar8,
      scar9: scar.scar9,
      scar10: scar.scar10,
      scar11: scar.scar11,
      scar12: scar.scar12,
      scar13: scar.scar13,
      scar14: scar.scar14,
      scar15: scar.scar15,
      scar16: scar.scar16,
    };
  };

  const exportReport = async () => {
    const response = await fetch("/Report_template(1).docx");
    const arrayBuffer = await response.arrayBuffer();

    const data = getCombinedData();
    console.log("Report data: ", data);
                                                                      // Here report is generated using JSZip
                                          
    const zip = new JSZip();
    const content = await zip.loadAsync(arrayBuffer);

    const doc = await content.file("word/document.xml").async("string");

    const replacedContent = replacePlaceholders(doc, data);

    zip.file("word/document.xml", replacedContent);

    const blob = await zip.generateAsync({ type: "blob" });

    saveAs(blob, "Report.docx");
  };

  const replacePlaceholders = (template, data) => {
    let content = template;
    console.log("Data to replace:", data);

    Object.keys(data).forEach((key) => {
      const placeholder = `{${key}}`;            //Function to replace placeholders in template with values entered and caluculated and also references
      if (!content.includes(placeholder)) {
        console.warn(`Placeholder ${placeholder} not found in template.`);
      }
      content = content.replace(new RegExp(placeholder, "g"), data[key]);
    });

    return content;
  };

  const handleExport = async () => {
    await exportReport();
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("LVRVData"));
    setData(savedData || {});
  }, []);

  return (
    <div className={styles["report-container"]}>
      <div className="top-bar">
        <h1>
          <b>Report</b>
        </h1>
      </div>
      <div className={styles["details-container"]}>
        <div className={styles["form-block"]}>
          <h2>Clinical Details</h2>
          <div className={styles["input-group"]}>
            <label>Protocol</label>
            <input
              type="text"
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
            />
          </div>
          <div className={styles["input-group"]}>
            <label>Patient's reason for having cardiac MRI</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <br></br>
          <br></br>
          <div className={styles["input-block-bar"]}>
            Viability assessment mapped to the 16-segment left ventricular
            segmentation model.<br></br> Wall motion score: 0 = normal, 1 = mildly
            hypokinetic, 2 = severe hypokinetic, 3 = akinetic, 4 = dyskinetic, 5
            = aneurysmal. Scoring for the transmural extent of LGE: 0 = 0%, 1 =
            1-25%, 2 = 26-50%, 3 = 51-75%, 4 = 76-100%.
          </div>
          <br></br>
          <br></br>

          <div className={styles["title-bar"]}>
            <label>
              <b>Basal</b>
            </label>
            <label>
              <b>Wall Motion</b>
            </label>
            <label>
              <b>Scar</b>
            </label>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Anterior</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion1"
                name="wallMotion1"
                value={wallMotion.wallMotion1}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion1", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar1"
                name="scar1"
                value={scar.scar1}
                onChange={(e) => handleScarChange("scar1", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Anterolateral</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion2"
                name="wallMotion2"
                value={wallMotion.wallMotion2}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion2", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar2"
                name="scar2"
                value={scar.scar2}
                onChange={(e) => handleScarChange("scar2", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Inferolateral</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion3"
                name="wallMotion3"
                value={wallMotion.wallMotion3}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion3", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar3"
                name="scar3"
                value={scar.scar3}
                onChange={(e) => handleScarChange("scar3", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Inferior</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion4"
                name="wallMotion4"
                value={wallMotion.wallMotion4}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion4", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar4"
                name="scar4"
                value={scar.scar4}
                onChange={(e) => handleScarChange("scar4", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Inferoseptal</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion5"
                name="wallMotion5"
                value={wallMotion.wallMotion5}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion5", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar5"
                name="scar5"
                value={scar.scar5}
                onChange={(e) => handleScarChange("scar5", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Anteroseptal</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion6"
                name="wallMotion6"
                value={wallMotion.wallMotion6}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion6", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar6"
                name="scar6"
                value={scar.scar6}
                onChange={(e) => handleScarChange("scar6", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["title-bar"]}>
            <label>
              <b>Mild</b>
            </label>
            <label>
              <b>Wall Motion</b>
            </label>
            <label>
              <b>Scar</b>
            </label>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Anterior</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion7"
                name="wallMotion7"
                value={wallMotion.wallMotion7}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion7", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar7"
                name="scar7"
                value={scar.scar7}
                onChange={(e) => handleScarChange("scar7", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Anterolateral</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion8"
                name="wallMotion8"
                value={wallMotion.wallMotion8}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion8", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar8"
                name="scar8"
                value={scar.scar8}
                onChange={(e) => handleScarChange("scar8", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Inferolateral</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion9"
                name="wallMotion9"
                value={wallMotion.wallMotion9}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion9", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar9"
                name="scar9"
                value={scar.scar9}
                onChange={(e) => handleScarChange("scar9", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Inferior</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion10"
                name="wallMotion10"
                value={wallMotion.wallMotion10}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion10", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar10"
                name="scar10"
                value={scar.scar10}
                onChange={(e) => handleScarChange("scar10", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Inferoseptal</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion11"
                name="wallMotion11"
                value={wallMotion.wallMotion11}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion11", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar11"
                name="scar11"
                value={scar.scar11}
                onChange={(e) => handleScarChange("scar11", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Anteroseptal</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion12"
                name="wallMotion12"
                value={wallMotion.wallMotion12}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion12", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar12"
                name="scar12"
                value={scar.scar12}
                onChange={(e) => handleScarChange("scar12", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["title-bar"]}>
            <label>
              <b>Apex</b>
            </label>
            <label>
              <b>Wall Motion</b>
            </label>
            <label>
              <b>Scar</b>
            </label>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Anterior</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion13"
                name="wallMotion13"
                value={wallMotion.wallMotion13}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion13", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar13"
                name="scar13"
                value={scar.scar13}
                onChange={(e) => handleScarChange("scar13", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Lateral</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion14"
                name="wallMotion14"
                value={wallMotion.wallMotion14}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion14", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar14"
                name="scar14"
                value={scar.scar14}
                onChange={(e) => handleScarChange("scar14", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Inferior</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion15"
                name="wallMotion15"
                value={wallMotion.wallMotion15}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion15", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar15"
                name="scar15"
                value={scar.scar15}
                onChange={(e) => handleScarChange("scar15", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-block-bar"]}>
            <label>
              <b>Septal</b>
            </label>
            <div className="dropdown-group">
              <select
                id="wallMotion16"
                name="wallMotion16"
                value={wallMotion.wallMotion16}
                onChange={(e) =>
                  handleWallMotionChange("wallMotion16", e.target.value)
                }
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="dropdown-group">
              <select
                id="scar16"
                name="scar16"
                value={scar.scar16}
                onChange={(e) => handleScarChange("scar16", e.target.value)}
                required
              >
                {options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["input-group"]}>
            <label>Conclusions</label>
            <input
              type="text"
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
            />
          </div>
          <div className={styles["input-group"]}>
            <label>Comment</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className={styles["input-group"]}>
            <label>Reported by Dr</label>
            <input
              type="text"
              placeholder="First Name"
              value={doctorInfo.firstName}
              onChange={(e) =>
                setDoctorInfo({ ...doctorInfo, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={doctorInfo.lastName}
              onChange={(e) =>
                setDoctorInfo({ ...doctorInfo, lastName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Title"
              value={doctorInfo.title}
              onChange={(e) =>
                setDoctorInfo({ ...doctorInfo, title: e.target.value })
              }
            />
          </div>
          <button onClick={handleExport} className="btn btn-primary">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
