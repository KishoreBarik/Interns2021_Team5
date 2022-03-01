import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import "./Categories.css";
import AdminProjects from "./Projects/AdminProjects";
import AdminUsers from "./Users/AdminUsers";

function Categories() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];

  return (
    <div
      className="p-3 overflow-auto"
      style={{
        height: "100vh",
      }}
    >
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className={`nav-link ${currentPath === "users" ? "active" : ""}`}
            id="nav-users-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-users"
            type="button"
            role="tab"
            aria-controls="nav-users"
            aria-selected="true"
            onClick={() => navigate(`/dashboard/users`)}
          >
            Users
          </button>
          <button
            className={`nav-link ${currentPath === "projects" ? "active" : ""}`}
            id="nav-projects-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-projects"
            type="button"
            role="tab"
            aria-controls="nav-projects"
            aria-selected="false"
            onClick={() => navigate(`/dashboard/projects`)}
          >
            Projects
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className={`tab-pane fade ${
            currentPath === "users" ? "show active" : ""
          }`}
          id="nav-users"
          role="tabpanel"
          aria-labelledby="nav-users-tab"
        >
          <AdminUsers />
        </div>
        <div
          className={`tab-pane fade ${
            currentPath === "projects" ? "show active" : ""
          }`}
          id="nav-projects"
          role="tabpanel"
          aria-labelledby="nav-projects-tab"
        >
          <AdminProjects />
        </div>
      </div>
    </div>
  );
}

export default Categories;
