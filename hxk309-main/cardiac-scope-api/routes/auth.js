const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  register,
  login,
  updateProfile,
  getProfile,
  getUserPreferences,
  fetchReferenceRanges,
  saveUserPreferences,
  fetchCmrTechniques,
  fetchCmrTechniqueReferences,
  handleUpload
} = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");
const authController = require("../controllers/authController");

const router = express.Router();

const storage = multer.memoryStorage();  // This stores files in memory
const upload = multer({ storage: storage });
const uploadFields = upload.fields([
  { name: "es_nii_file", maxCount: 1 },
  { name: "ed_nii_file", maxCount: 1 },
  { name: "cfg_file", maxCount: 1 }
]);

//All API routes are present here.
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, getProfile);
router.put("/profile", authenticateToken, updateProfile);
router.get("/preferences", authenticateToken, getUserPreferences);
router.get("/references", fetchReferenceRanges);
router.post("/preferences", authenticateToken, saveUserPreferences);
router.get("/cmrtechniques", authenticateToken, fetchCmrTechniques);
router.get(
  "/cmrtechniquereferences",
  authenticateToken,
  fetchCmrTechniqueReferences
);
router.post("/handleUpload", uploadFields, handleUpload)

module.exports = router;
