import React, { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Image from "react-bootstrap/Image";
import AddProject from "./AddProject/AddProject";
import "./AdminProjects.css";

function AdminProjects() {
  const [projects, setProjects] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  let projectIndex;
  const fetchProjects = async () => {
    const response = await fetch("http://localhost:5000/projects");
    const projects = await response.json();
    setProjects(projects);
    console.log(projects);
  };

  const editSelected = (id) => {
    projectIndex = projects.findIndex((p) => p.id === id);
    console.log(projects[projectIndex]);
    setSelectedProject(projects[projectIndex]);
    id === selectedProject.id && !open ? setOpen(true) : setOpen(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="my-2">
      <div className="d-flex justify-content-end my-2">
        <button
          onClick={() => setIsAdd(!isAdd)}
          aria-controls="addProject"
          aria-expanded={isAdd}
          className="btn btn-primary float-right"
        >
          {isAdd ? "Cancel" : "Add project"}
        </button>
      </div>
      <Collapse in={isAdd}>
        <div id="addProject" className="bg-light my-2">
          <AddProject />
        </div>
      </Collapse>

      <div className="list-group">
        {projects &&
          projects.map((project) => (
            <div
              className="list-group-item flex-column align-items-start"
              key={project.id}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <Image
                    src={project.image}
                    className="img-thumbnail"
                    width={50}
                    height={50}
                  />
                  <div className="mx-2">
                    <h6 className="m-0">{project.title}</h6>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mx-2"
                    onClick={() => editSelected(project.id)}
                    aria-controls={project.id}
                    aria-expanded={
                      project.id === selectedProject.id && open === false
                        ? true
                        : false
                    }
                  >
                    {project.id === selectedProject.id && !open
                      ? "Cancel"
                      : "Edit"}
                  </button>
                  <button type="button" className="btn btn-outline-danger">
                    Delete
                  </button>
                </div>
              </div>
              <Collapse
                in={
                  project.id === selectedProject.id && open === false
                    ? true
                    : false
                }
                className="my-3"
              >
                <div id={project.id} className="bg-light">
                  <AddProject />
                </div>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminProjects;
