import React, { useState } from "react";
import styles from ".././Dashboard.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import projectIcon from "/Users/HP/Documents/Interns2021_Team5/ui/src/Assets/project_icon.png";
import { RiCloseLine } from "react-icons/ri";

function Projects() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProject, setselectedProject] = useState("");

  const path = location.pathname.split("/")[2];

  let projects = [];
  let tools = [
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
    },
  ];

  for (let index = 1; index <= 15; index++) {
    projects[index] = "Project " + index;
  }

  const openProject = (name) => {
    setselectedProject(name);
    navigate(`/dashboard/${name}`, { replace: true });
  };

  const closeProject = () => {
    navigate(`/dashboard`, { replace: true });
  };
  return (
    <div className="d-flex">
      <div className="col">
        <div className="container-fluid">
          <div className="row p-4">
            {projects.map((project) => (
              <div className="col-xl-2 col-md-4 col-sm-6 mb-4">
                <div
                  className={styles.project_card}
                  onClick={() => openProject(project)}
                >
                  <img
                    src={projectIcon}
                    alt="Project"
                    className={styles.img_fluid}
                  />
                  <p>{project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {path !== undefined && <div className="vr"></div>}
      {path !== undefined && (
        <div className="col">
          <div className="container-fluid">
            <div className="row p-4">
              <div className="d-flex justify-content-end">
                <RiCloseLine
                  size="30px"
                  cursor="pointer"
                  onClick={() => closeProject()}
                />
              </div>
              <h4>{selectedProject}</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <h4>Tools</h4>
              {tools.map((tool) => (
                <div className="col-xl-4 col-md-6 col-sm-6 col-xs-2  mb-4">
                  <div className="card">
                    <a
                      className="text-decoration-none"
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="card-body">
                        <div className="card-text text-center">
                          <img
                            src={projectIcon}
                            alt="ToolIcon"
                            className={styles.tool_icon}
                          />
                          {tool.name}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;
