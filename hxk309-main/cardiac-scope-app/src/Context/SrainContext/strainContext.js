import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../../Services/axiosConfig";

const StrainContext = createContext();

export const StrainProvider = ({ children }) => {
  const [cmrTechniques, setCmrTechniques] = useState();
  const [cmrTechniqueReferences, setCmrTechniqueReferences] = useState();

  useEffect (() => {
    const fetchCMRTechniques = async () => {
        try {
          const response = await axios.get(`/api/auth/cmrtechniques`);
          console.log("CMR Techniques", response.data);
          setCmrTechniques(response.data);
        } catch (error) {
          console.error("Error fetching CMR Techniques: ", error);
        }
      };
      fetchCMRTechniques()
  }, [])

  useEffect (() => {
    const fetchCMRTechniqueReferences = async () => {
        try {
          const response = await axios.get(`/api/auth/cmrtechniqueReferences`);
          console.log("CMR Technique References", response.data);
          setCmrTechniqueReferences(response.data);
        } catch (error) {
          console.error("Error fetching CMR Technique References: ", error);
        }
      };
      fetchCMRTechniqueReferences()
  }, [])
  
  return (
    <StrainContext.Provider
      value={{
        cmrTechniques,
        setCmrTechniques,
        cmrTechniqueReferences,
        setCmrTechniqueReferences
      }}
    >
      {children}
    </StrainContext.Provider>
  );
};

export const useStrain = () => useContext(StrainContext);
