import React, { useEffect, useState } from "react";
import styles from ".././Dashboard.module.css";
import { RiCloseLine } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import errorImage from "../../../Assets/no-image.png";
import ProjectDetail from "./ProjectDetail";

function Projects() {
  const [selectedProject, setselectedProject] = useState({});
  const [projects, setProjects] = useState(null);

  let projectIndex;

  const fetchProjects = async () => {
    const response = await fetch("http://localhost:5000/projects");
    const projects = await response.json();
    setProjects(projects);
    console.log(projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openProject = (id) => {
    projectIndex = projects.findIndex((p) => p.id === id);
    console.log(projects[projectIndex]);
    setselectedProject(projects[projectIndex]);
  };

  const closeProject = () => {
    setselectedProject({});
  };

  return (
    <div className="d-flex">
      <div className="col">
        <div className="container-fluid p-4">
          <div className="d-flex flex-wrap align-items-stretch">
            {projects &&
              projects.map((project) => (
                <div
                  className={
                    Object.keys(selectedProject).length !== 0
                      ? `col-xl-4 col-md-4 mb-2 ${styles.project_col} col-sm-6`
                      : `col-xl-2 col-md-4 mb-2 ${styles.project_col} col-sm-6`
                  }
                  key={project.id}
                >
                  <div className={`card m-1 h-100 ${styles.project_container}`}>
                    <img
                      className={`card-img-top ${styles.img}`}
                      src={project.image}
                      alt="Project_img"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = errorImage;
                      }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h6 className="card-title">{project.title}</h6>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => openProject(project.id)}
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {Object.keys(selectedProject).length !== 0 && <div className="vr"></div>}
      {Object.keys(selectedProject).length !== 0 && (
        <div className="col">
          <ProjectDetail
            selectedProject={selectedProject}
            closeProject={() => closeProject()}
          />
        </div>
      )}
    </div>
  );
}

export default Projects;
