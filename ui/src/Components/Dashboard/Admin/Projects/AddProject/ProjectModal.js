import { useState } from "react";
import AddProject from "./AddProject";

function ProjectModal(props) {
  return (
    <div
      className="modal fade"
      id="projectModal"
      tabIndex="-1"
      aria-labelledby="projectModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="projectModalLabel">
              {props.title}
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
  );
}

export default ProjectModal;
