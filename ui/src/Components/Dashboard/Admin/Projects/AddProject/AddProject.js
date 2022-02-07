import React, { useState } from "react";
import Image from "react-bootstrap/esm/Image";
import { AiFillCloseCircle } from "react-icons/ai";
import AddTool from "../../../Admin/AddTool.js";
import "../../Projects/AdminProjects.css";

function AddProject(props) {
  const initialValues = {
    title: "",
    desc: "",
    image: "",
    tools: [],
  };
  // { id: "1", title: "tool", desc: "", url: "https://getbootstrap.com/" },
  // { id: "2", title: "tooldef", desc: "", url: "https://getbootstrap.com/" },
  // {
  //   id: "3",
  //   title: "tooldefsdf",
  //   desc: "",
  //   url: "https://getbootstrap.com/",
  // },
  const initialToolValues = { id: "", title: "", desc: "", url: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [toolErrors, settoolErrors] = useState({});
  const [selectedTool, setselectedTool] = useState(initialToolValues);
  const [toolSelected, settoolSelected] = useState(false);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleToolChanges = (e) => {
    const { name, value } = e.target;
    setselectedTool({ ...selectedTool, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(handleValidation(formValues));
    if (!Object.values(formValues).includes("")) {
      console.log(formValues["tools"]);
      setformValues({ ...formValues });
      console.log(formValues);
    }
  };

  const handleAddTool = (e) => {
    e.preventDefault();
    console.log(selectedTool);
    settoolErrors(handletoolValidation(selectedTool));

    if (selectedTool.id === "") {
      console.log("New tool");
      let dum = { ...selectedTool };
      delete dum.id;
      console.log(selectedTool, dum);
      if (
        !Object.values(toolErrors).includes("") &&
        !Object.values(dum).includes("")
      ) {
        selectedTool.id = formValues["tools"].length + 1;
        console.log(selectedTool.id);
        formValues["tools"].push(selectedTool);
        console.log(toolErrors);
        setformValues({
          ...formValues,
        });
        console.log(formValues);
        setselectedTool(initialToolValues);
      }
    } else {
      console.log("Existing tool");
      if (
        !Object.values(selectedTool).includes("") &&
        !Object.values(toolErrors).includes("")
      ) {
        console.log(toolErrors);
        let toolIndex = formValues["tools"].findIndex(
          (p) => p.id === selectedTool.id
        );
        formValues["tools"][toolIndex] = selectedTool;
        console.log(toolIndex, formValues["tools"]);
        setformValues({
          ...formValues,
        });
        setselectedTool(initialToolValues);
        console.log(formValues);
      }
    }
    settoolSelected(false);
  };

  const handleValidation = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!values.desc) {
      errors.desc = "Description is required!";
    }
    if (!values.image) {
      errors.image = "Image is required!";
    }

    return errors;
  };
  const handletoolValidation = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!values.desc) {
      errors.desc = "Description is required!";
    }
    if (!values.url) {
      errors.url = "Url is required!";
    }

    return errors;
  };

  const selectTool = (id) => {
    settoolSelected(true);
    let toolIndex = formValues["tools"].findIndex((p) => p.id === id);
    setselectedTool(formValues["tools"][toolIndex]);
  };

  const removeTool = (id) => {
    var filtered = formValues["tools"].filter((e) => e.id !== id);
    formValues["tools"] = filtered;
    setformValues({ ...formValues });
    setselectedTool(initialToolValues);
    settoolSelected(false);
  };

  const cancelToolSelect = () => {
    setselectedTool(initialToolValues);
    settoolSelected(false);
  };

  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col">
        <div className="p-2">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-1">
              <input
                type="text"
                className="form-control"
                placeholder="Enter project title"
                value={formValues.title}
                name="title"
                onChange={handleChanges}
              />
            </div>
            <p className="text-danger">{formErrors.title}</p>
            <div className="form-group mb-1">
              <textarea
                className="form-control"
                placeholder="Enter project description"
                value={formValues.desc}
                name="desc"
                rows="3"
                onChange={handleChanges}
              ></textarea>
            </div>
            <p className="text-danger">{formErrors.desc}</p>
            <div className="form-group mb-1">
              <input
                className="form-control"
                value={formValues.image}
                name="image"
                onChange={handleChanges}
                type="file"
              />
            </div>
            <p className="text-danger">{formErrors.image}</p>
            {formValues["tools"].length === 0 ? (
              <div></div>
            ) : (
              <div className="d-flex gap-2 flex-wrap border p-3 rounded mb-4">
                {formValues["tools"].map((tool, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col">
                        <div className="d-flex gap-2 align-items-center container-fluid bg-light rounded p-1 border">
                          <Image
                            src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${tool.url}&size=16`}
                            className="img"
                            roundedCircle
                            width={20}
                            height={20}
                            onClick={() => selectTool(tool.id)}
                            style={{ cursor: "pointer" }}
                          />
                          <div
                            onClick={() => selectTool(tool.id)}
                            style={{ cursor: "pointer" }}
                          >
                            {tool.title}
                          </div>
                          <AiFillCloseCircle
                            style={{ cursor: "pointer" }}
                            color="grey"
                            onClick={() => removeTool(tool.id)}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <AddTool
              handleChanges={handleToolChanges}
              toolErrors={toolErrors}
              toolValues={selectedTool}
            />
            <div className="form-group mb-4">
              <div className="row gap-2 mx-0">
                {toolSelected && formValues["tools"].length !== 0 ? (
                  <button
                    className="col btn border"
                    type="button"
                    onClick={cancelToolSelect}
                  >
                    Cancel
                  </button>
                ) : (
                  <></>
                )}
                <button
                  className="col btn-primary rounded border-0 p-2"
                  type="button"
                  onClick={handleAddTool}
                >
                  {toolSelected && formValues["tools"].length !== 0
                    ? "Save"
                    : "+ Add Tool"}
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
