import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Image from "react-bootstrap/Image";
import "./AdminProjects.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

toast.configure();
function AdminProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);

  // const initialValues = {
  //   title: "",
  //   description: "",
  //   image: "",
  //   users: [],
  //   tools: [],
  // };

  const fetchProjects = async () => {
    const response = await fetch("http://localhost:5000/projects");
    const projects = await response.json();
    setProjects(projects);
  };

  const editSelected = (id) => {
    navigate(`/dashboard/projects/${id}`);
  };

  const addProject = () => {
    navigate(`/dashboard/projects/addProject`);
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
              type="button"
              onClick={addProject}
              className="btn btn-primary float-right"
            >
              Add project
            </button>
          </div>
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
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
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
    </>
  );
}

export default AdminProjects;
