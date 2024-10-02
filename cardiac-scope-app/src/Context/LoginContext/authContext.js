import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('ecvInputs');
        localStorage.removeItem('ecv');
        localStorage.removeItem('ecvData');
        setToken(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
