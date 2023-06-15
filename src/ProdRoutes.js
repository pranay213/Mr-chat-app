import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Chats from "./pages/Chats";
import { MainContext } from "./Context";
import OtpScreen from "./pages/Auth/Otp";
import ProfileSetup from "./pages/ProfileSetup";

const ProdRoutes = () => {
  const { loginToken } = useContext(MainContext);
  return (
    <BrowserRouter>{loginToken ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  );
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<OtpScreen />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Chats />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/profile" element={<ProfileSetup />} />
      <Route path="*" element={<Chats />} />
    </Routes>
  );
};

export default ProdRoutes;
