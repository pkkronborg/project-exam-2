import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/venues/home";
import Details from "./pages/venues/details";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import Profile from "./pages/profile/myProfile";
import MyBookings from "./pages/profile/myBookings";
import MyVenues from "./pages/venues/myVenues";
function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Handlers for Register Modal
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  // Handlers for Login Modal
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  return (
    <div className="App">
      <RegisterModal
        show={isRegisterModalOpen}
        handleClose={handleCloseRegisterModal}
      />
      <LoginModal show={isLoginModalOpen} handleClose={handleCloseLoginModal} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              onRegisterClick={handleOpenRegisterModal}
              onLoginClick={handleOpenLoginModal}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="venue/:id" element={<Details />} />
          <Route path="myProfile/" element={<Profile />} />
          <Route path="myBookings/" element={<MyBookings />} />
          <Route path="myVenues/" element={<MyVenues />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
