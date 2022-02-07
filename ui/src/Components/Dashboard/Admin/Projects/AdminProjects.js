import React, { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Image from "react-bootstrap/Image";
import AddProject from "./AddProject/AddProject";
import "./AdminProjects.css";

function AdminProjects() {
  const [projects, setProjects] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  // const [selectedProject, setSelectedProject] = useState({});

  // let projectIndex;
  const fetchProjects = async () => {
    const response = await fetch("http://localhost:5000/projects");
    const projects = await response.json();
    setProjects(projects);
  };

  const editSelected = (id) => {
    // projectIndex = projects.findIndex((p) => p.id === id);
    // setSelectedProject(projects[projectIndex]);
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <>
      <div className="my-2">
        <div>
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
                        data-bs-toggle="modal"
                        data-bs-target="#toolModal"
                        onClick={() => editSelected(project.id)}
                      >
                        <BiEdit size={20} />
                      </button>
                      <button type="button" className="btn btn-outline-danger">
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="toolModal"
        tabIndex="-1"
        aria-labelledby="toolModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="toolModalLabel">
                Add a project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddProject />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProjects;
