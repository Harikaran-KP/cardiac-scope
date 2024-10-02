import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../../Services/axiosConfig';
import { useAuth } from '../../Context/LoginContext/authContext';
import { useNavigate } from "react-router-dom";

const ProfileContext = createContext();

//API call for profile

export const ProfileProvider = ({ children }) => {
    const { isLoggedIn, token } = useAuth();
    const navigate = useNavigate()
    const [profile, setProfile] = useState({
        first_name: '',
        last_name: '',
        email: '',
        city: '',
        country: '',
        hospital_name: '',
        mri_scanner: '',
        analysis_software: '',
        phone_number: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (isLoggedIn && token) {
                setIsLoading(true);
                try {
                    const response = await axios.get('/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setProfile(response.data);
                    setError(null);
                } catch (error) {
                    if (error.status === 403){
                        navigate('/login')
                    }
                    console.error('Error fetching profile data:', error);
                    setError('Failed to fetch profile data');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchProfile();
    }, [isLoggedIn, token]);

    const updateProfile = async (newProfile) => {
        setIsLoading(true);
        try {
            const response = await axios.put('/api/auth/profile', newProfile, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProfile(response.data);
            console.log('Profile updated:', response.data);
            alert('Profile updated successfully!');
            setError(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
            alert('Failed to update profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, isLoading, error }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);
