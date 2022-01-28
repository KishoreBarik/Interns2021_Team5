import React, {useEffect, useState } from "react";
import styles from ".././Dashboard.module.css";
import projectIcon from "../../../../src/Assets/project_icon.png";
import { RiCloseLine } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function Projects() {
  const [selectedProject, setselectedProject] = useState({});

  let projectIndex;
  let projects = [];
  let tools = [
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
      desc: "desc1",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
      desc: "desc2",
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com/",
      desc: "desc3",
    },
    {
      name: "Stack overflow",
      url: "https://stackoverflow.com/",
      desc: "desc4",
    },
    {
      name: "Github",
      url: "https://github.com/",
      desc: "desc5",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
      desc: "desc6",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
      desc: "desc7",
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com/",
      desc: "desc8",
    },
    {
      name: "Stack overflow",
      url: "https://stackoverflow.com/",
      desc: "desc9",
    },
    {
      name: "Github",
      url: "https://github.com/",
      desc: "desc10",
    },
    {
      name: "Bootstrap",
      url: "https://getbootstrap.com/",
      desc: "desc11",
    },
    {
      name: "Google",
      url: "https://www.google.com/",
      desc: "desc12",
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com/",
      desc: "desc13",
    },
    {
      name: "Stack overflow",
      url: "https://stackoverflow.com/",
      desc: "desc14",
    },
    {
      name: "Github",
      url: "https://github.com/",
      desc: "desc15",
    },
  ];

  for (let index = 1; index <= 15; index++) {
    projects.push({
      id: "p" + index,
      name: "Project " + index,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      tools: tools,
    });
  }

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
            {projects.map((project) => (
              <div className="col-xl-2 col-md-4 col-sm-6 mb-4" key={project.id}>
                <div
                  className={styles.project_card}
                  onClick={() => openProject(project.id)}
                >
                  <img
                    src={projectIcon}
                    alt="Project"
                    className={styles.img_fluid}
                  />
                  <p>{project.name}</p>
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
              <h4>{selectedProject.name}</h4>
              <p>{selectedProject.desc}</p>
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
