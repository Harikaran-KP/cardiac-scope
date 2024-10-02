import React, { useState, useEffect } from "react";
import { useProfile } from "../../Context/ProfileContext/profileContext";
import { useStrain } from "../../Context/SrainContext/strainContext";
import "./Home.css";

const Home = () => {                                 // Home page, with read screen and edit screen
  const { profile, updateProfile } = useProfile();   //Consuming profile context (where profile data is present)
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [editMode, setEditMode] = useState(false);

  const cmr = useStrain()

  useEffect(() => {
    setEditProfile(profile);
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(editProfile);
    setEditMode(false);
    // console.log(cmr)
  };

  return (
    <div className="home-container">
      <div className="top-bar">
        <h1>
          <b>Clinician Details</b>
        </h1>
        {!editMode && <button onClick={() => setEditMode(true)}>Edit</button>}
        {editMode && <button onClick={() => setEditMode(false)}>Cancel</button>}
      </div>
      {editMode ? (
        <form className="form-block" onSubmit={handleSubmit}>
          <div className="input-block-bar">
            <div className="input-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={editProfile.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={editProfile.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-block-bar">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={editProfile.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={editProfile.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-block-bar">
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={editProfile.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="hospital_name">Hospital Name</label>
              <input
                type="text"
                id="hospital_name"
                name="hospital_name"
                value={editProfile.hospital_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-block-bar">
            <div className="input-group">
              <label htmlFor="mri_scanner">MRI Scanner</label>
              <input
                type="text"
                id="mri_scanner"
                name="mri_scanner"
                value={editProfile.mri_scanner}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="analysis_software">Analysis Software</label>
              <input
                type="text"
                id="analysis_software"
                name="analysis_software"
                value={editProfile.analysis_software}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input-block-bar">
            <div className="input-group">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={editProfile.phone_number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group"></div>
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      ) : (
        <div className="read-block">
          <div className="read-block-bar">
            <p>
              <strong>First Name</strong> <br></br> {profile.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> <br></br> {profile.last_name}
            </p>
          </div>
          <div className="read-block-bar">
            <p>
              <strong>Email</strong> <br></br> {profile.email}
            </p>
            <p>
              <strong>City</strong> <br></br> {profile.city}
            </p>
          </div>
          <div className="read-block-bar">
            <p>
              <strong>Country</strong> <br></br> {profile.country}
            </p>
            <p>
              <strong>Hospital Name</strong> <br></br> {profile.hospital_name}
            </p>
          </div>
          <div className="read-block-bar">
            <p>
              <strong>MRI Scanner</strong> <br></br> {profile.mri_scanner}
            </p>
            <p>
              <strong>Analysis Software</strong> <br></br>{" "}
              {profile.analysis_software}
            </p>
          </div>
          <div className="read-block-bar">
            <p>
              <strong>Phone Number</strong> <br></br> {profile.phone_number}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
