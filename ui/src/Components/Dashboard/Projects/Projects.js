import React, { useEffect, useState } from "react";
import styles from ".././Dashboard.module.css";
import { RiCloseLine } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
        <div className="container-fluid">
          <div className="row p-4">
            {projects &&
              projects.map((project) => (
                <div
                  className="col-xl-2 col-md-4 col-sm-6 mb-4"
                  key={project.id}
                >
                  <div
                    className={styles.project_card}
                    onClick={() => openProject(project.id)}
                  >
                    <img
                      src={project.image}
                      alt="Project"
                      className={styles.img_fluid}
                    />
                    <p>{project.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {Object.keys(selectedProject).length !== 0 && <div className="vr"></div>}
      {Object.keys(selectedProject).length !== 0 && (
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
              <h4>{selectedProject.title}</h4>
              <p>{selectedProject.description}</p>
              <h4>Tools</h4>
              {selectedProject.tools?.map((tool, index) => (
                <div
                  className="col-xl-4 col-md-6 col-sm-6 col-xs-2  mb-4"
                  key={index}
                >
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-${tool.name}}`}>
                        {tool.desc}
                      </Tooltip>
                    }
                  >
                    <div className="card">
                      <a
                        className="text-decoration-none"
                        href={tool.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="card-body">
                          <div className="card-text text-center d-flex justify-content-center align-items-center">
                            <img
                              src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${tool.url}&size=16`}
                              alt="ToolIcon"
                              className={styles.tool_icon}
                            />
                            <div className="mx-2 my-0">{tool.name}</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </OverlayTrigger>
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
