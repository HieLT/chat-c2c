import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./auth/components/Auth"; // Login/Register Page
import Chat from "./chat/components/Chat"; // Chat Component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status
  const [user, setUser] = useState(null); // User data after login

  // Simulate login function (replace with actual login logic)
  const handleLogin = (userData) => {
    console.log('userData',userData);
    setUser(userData); // Set the user data
    setIsAuthenticated(true); // Mark as authenticated
    
    
  };

  // Simulate logout function
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Redirect to Chat if authenticated, otherwise show Auth */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/chat" />
            ) : (
              <Auth onLogin={handleLogin} />
            )
          }
        />

        {/* Chat page (protected route) */}
        <Route
          path="/chat"
          element={
            isAuthenticated ? (
              <Chat user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
