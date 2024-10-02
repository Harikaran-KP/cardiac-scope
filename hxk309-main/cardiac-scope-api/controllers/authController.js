const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const FormData = require("form-data");
const axios = require("axios");
// const multer = require("multer");
const {
  createUser,
  findUserByEmail,
  getUserById,
  updateUser,
  getReferenceRanges,
  updateUserPreferences,
  getCmrTechniques,
  getCmrTechniqueReferences,
} = require("../models/userModel");

// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })
//All API controllers are here. Contains business logic most times. 

const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  try {
    const user = await createUser(first_name, last_name, email, hashedPassword);
    res.status(201).json({ id: user.id });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Server error" });
  }
};


//Login controller, used only hashed pwd
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ token });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error" });
  }
};

//CRUD for the below functions
const getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Error getting user profile:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  //const userId = req.user.id;
  try {
    const userId = req.user.id;
    const userData = req.body;
    const updatedUser = await updateUser(userId, userData);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request
    const user = await getUserById(userId);
    res.json({ publicationId: user.publication_reference });
  } catch (err) {
    console.error("Error fetching user preferences:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchReferenceRanges = async (req, res) => {
  const { publicationId, gender, age } = req.query;
  console.log(
    `Fetching references with publicationId: ${publicationId}, gender: ${gender}, age: ${age}`
  ); // Debug log

  try {
    const ranges = await getReferenceRanges(publicationId, gender, age);
    console.log("Fetched ranges:", ranges); // Debug log
    res.json(ranges);
  } catch (err) {
    console.error("Error fetching reference ranges:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const saveUserPreferences = async (req, res) => {
  console.log("API call received");
  console.log("Request Body:", req.body);
  const userId = req.user.id; // Assuming user ID is available in the request
  const { publicationRef } = req.body;
  console.log("User ID:", userId);
  console.log("Publication Reference:", publicationRef);
  try {
    await updateUserPreferences(userId, publicationRef);
    res.status(200).json({ message: "Preference updated" });
  } catch (err) {
    console.error("Error saving user preferences:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchCmrTechniques = async (req, res) => {
  try {
    const cmr_techniques = await getCmrTechniques();
    res.json(cmr_techniques);
  } catch (err) {
    console.error("Error fetching CMR techniques:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchCmrTechniqueReferences = async (req, res) => {
  try {
    const cmr_technique_references = await getCmrTechniqueReferences();
    res.json(cmr_technique_references);
  } catch (err) {
    console.error("Error fetching CMR technique references:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Upload handler used in Integration module.
const handleUpload = async (req, res) => {
  console.log('Files received:', req.files);
  try {
    // Accessing the first file in each array from req.files
    const es_nii_file = req.files.es_nii_file[0];
    const ed_nii_file = req.files.ed_nii_file[0];
    const cfg_file = req.files.cfg_file[0];

    // Checking if all the files are uploaded
    if (!es_nii_file || !ed_nii_file || !cfg_file) {
      return res.status(400).send("Five files are required (4 .nii.gz, 1 .cfg).");
    }

    // Creating a new FormData instance and append files
    const formData = new FormData();
    formData.append('es_nii_file', es_nii_file.buffer, es_nii_file.originalname);
    formData.append('ed_nii_file', ed_nii_file.buffer, ed_nii_file.originalname);
    formData.append('cfg_file', cfg_file.buffer, cfg_file.originalname);

    // Sending the files to the Python server
    const pythonData = await axios.post("https://a244-34-126-147-233.ngrok-free.app/api/files", formData, {
      headers: formData.getHeaders(),
    });

    // Sending back the response from the Python server
    res.status(200).send(pythonData.data);
  } catch (error) {
    console.error("Error processing files:", error);
    res.status(500).send({ message: "Error processing files", error: error });
  }
};


module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  getUserPreferences,
  fetchReferenceRanges,
  saveUserPreferences,
  fetchCmrTechniques,
  fetchCmrTechniqueReferences,
  handleUpload,
};
