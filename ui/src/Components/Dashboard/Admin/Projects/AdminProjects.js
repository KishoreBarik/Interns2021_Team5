import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Image from "react-bootstrap/Image";
import "./AdminProjects.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import errorImage from "../../../../Assets/no-image.png";
import ProjectsContext from "../../../../Context/ProjectsContext";
import Loading from "../../../../Common/Loading/Loading";

toast.configure();
function AdminProjects() {
  const navigate = useNavigate();
  const [selectedProjectId, setselectedProjectId] = useState();

  const projectCtx = useContext(ProjectsContext);

  const editSelected = (id) => {
    navigate(`/dashboard/projects/${id}`);
  };

  const setselectedProject = (id) => {
    setselectedProjectId(id);
    console.log(id, selectedProjectId);
  };

  const addProject = () => {
    navigate(`/dashboard/projects/addProject`);
  };

  useEffect(() => {
    projectCtx.fetchProjects();
  }, []);
  return (
    <>
      {!projectCtx.projects ? (
        <Loading />
      ) : (
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
                {projectCtx.projects &&
                  projectCtx.projects.map((project) => {
                    return (
                      <div
                        className="list-group-item flex-column align-items-start"
                        key={project.id}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <Image
                              src={project.image}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = errorImage;
                              }}
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
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteProjectModal"
                              onClick={() => setselectedProject(project.id)}
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="deleteProjectModal"
            tabIndex="-1"
            aria-labelledby="deleteProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <h5
                    className="modal-title m-4 text-center"
                    id="deleteProjectModalLabel"
                  >
                    Are you sure want to delete this project?
                  </h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => projectCtx.deleteProject(selectedProjectId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminProjects;
