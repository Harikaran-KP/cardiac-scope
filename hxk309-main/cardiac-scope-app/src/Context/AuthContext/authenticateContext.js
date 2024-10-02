import React, { createContext, useContext, useState } from 'react';

const AuthenticateContext = createContext(null);

export const AuthenticateProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    return (
        <AuthenticateContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthenticateContext.Provider>
    );
};

export const useAuthenticate = () => useContext(AuthenticateContext);