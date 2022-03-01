import React from "react";
import "./Categories.css";
import AdminProjects from "./Projects/AdminProjects";
import AdminUsers from "./Users/AdminUsers";

function Categories() {
  return (
    <div className="p-3">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link"
            id="nav-users-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-users"
            type="button"
            role="tab"
            aria-controls="nav-users"
            aria-selected="true"
          >
            Users
          </button>
          <button
            className="nav-link active"
            id="nav-projects-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-projects"
            type="button"
            role="tab"
            aria-controls="nav-projects"
            aria-selected="false"
          >
            Projects
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade "
          id="nav-users"
          role="tabpanel"
          aria-labelledby="nav-users-tab"
        >
          <AdminUsers />
        </div>
        <div
          className="tab-pane fade show active"
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
