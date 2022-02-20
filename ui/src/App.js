import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Login from "./Components/Login/Login";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import AuthContext from "./Context/AuthContext.js";
import AddProject from "./Components/Dashboard/Admin/Projects/AddProject/AddProject.js";
import AdminProfile from "./Components/Dashboard/Admin/AdminProfile.js";
import AddUser from "./Components/Dashboard/Admin/Users/AddUser/AddUser";

const App = () => {
  const ctx = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={ctx.isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={!ctx.isLoggedIn ? <Navigate to="/" /> : <Dashboard />}
      />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/dashboard/projects/addProject" element={<AddProject />} />
      <Route path="/dashboard/projects/:id" element={<AddProject />} />
      <Route path="/dashboard/admin/:id" element={<AdminProfile/>}/>
      <Route path="/dashboard/users/AddUser" element={<AddUser/>}/>
      <Route path="/dashboard/users/:id" element={<AddUser/>}/>
    </Routes>
  );
};

export default App;
