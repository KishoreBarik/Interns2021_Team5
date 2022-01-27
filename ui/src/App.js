import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Login from "./Components/Login/Login";
import ChangePassword from "./Components/ChangePassword/ChangePassword";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
