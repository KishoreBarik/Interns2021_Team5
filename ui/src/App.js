import React from "react";
import { Route, Routes } from "react-router-dom";
import FormWith2Inps from "./Common/FormWith2Inps";
import Dashboard from "./Components/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FormWith2Inps title="Loginss" />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
