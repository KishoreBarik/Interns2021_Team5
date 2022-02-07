import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
