import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [venueManager, setVenueManager] = useState(false);
  
    // Initialize authentication state when the app loads
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      const role = localStorage.getItem("venueManager") === "true";
  
      setIsLoggedIn(!!token); 
      setVenueManager(role);
    }, []);

    const login = (data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("name", data.name);
        localStorage.setItem("venueManager", data.venueManager);
        setIsLoggedIn(true);
        setVenueManager(data.venueManager);
      };
      
    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("name");
        localStorage.removeItem("venueManager");
        setIsLoggedIn(false);
        setVenueManager(false);
      };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, venueManager, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };