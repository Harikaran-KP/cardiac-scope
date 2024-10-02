import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "../../Services/axiosConfig"; 
import { useAuth } from "../../Context/LoginContext/authContext";

const LVRVContext = createContext();

export const LVRVProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [userId, setUserId] = useState("");
  const [publicationRef, setPublicationRef] = useState(1);
  const [references, setReferences] = useState([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(1);
  const [lvrvData, setLvrvData] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      if (isLoggedIn) {
        const response = await axios.get("/api/auth/profile");
        setUserId(response.data.id);
        console.log(userId, "Testing");
        const publication_preference = response.data.publication_preference
        setPublicationRef(publication_preference);
      }
    };
    fetchUserId();
  }, [isLoggedIn, userId]);


  const fetchReferences = useCallback(async (publicationId, gender, age) => {
    if (!publicationId || !gender || !age) {
      console.log("Missing parameters", {publicationId, gender, age});
      return; // Exit if any parameter is undefined or invalid
    }

    try {
      const response = await axios.get(`/api/auth/references`, {                //reference values are fetched by API endpoints
        params: { publicationId, gender, age },
      });
      setReferences(response.data);
      console.log("API called with:", response.data);
    } catch (error) {
      console.error("Error fetching references:", error);
    }
  }, []); 

  const savePublicationPreference = async (userId, publicationId) => {
    try {
      console.log('Test:', publicationId)
      const response = await axios.post(`/api/auth/preferences`, {
          publicationRef, 
      });
      console.log("Publication preference saved:", response.data);
    } catch (error) {
      console.error("Error saving publication preference:", error);
    }
  };

  const updateLVRVData = (newData) => {
    setLvrvData(newData);
  };

  return (
    <LVRVContext.Provider
      value={{
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
      }}
    >
      {children}
    </LVRVContext.Provider>
  );
};

export const useLVRV = () => useContext(LVRVContext);
