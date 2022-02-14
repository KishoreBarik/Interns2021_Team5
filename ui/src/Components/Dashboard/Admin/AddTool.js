import React from "react";

function AddTool(props) {
  return (
    <div>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col">
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tool name"
              value={props.toolValues.title || ""}
              name="title"
              onChange={(e) => props.handleChanges(e)}
            />
          </div>
          <p className="text-danger">{props.toolErrors.title}</p>
          <div className="form-group mb-1">
            <textarea
              className="form-control"
              placeholder="Enter tool description"
              value={props.toolValues.description || ""}
              name="description"
              rows="3"
              onChange={(e) => props.handleChanges(e)}
            ></textarea>
          </div>
          <p className="text-danger">{props.toolErrors.description}</p>
          <div className="form-group mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tool url"
              value={props.toolValues.url || ""}
              name="url"
              onChange={(e) => props.handleChanges(e)}
            />
          </div>
          <p className="text-danger">{props.toolErrors.url}</p>
        </div>
      </div>
    </div>
  );
}

export default AddTool;
