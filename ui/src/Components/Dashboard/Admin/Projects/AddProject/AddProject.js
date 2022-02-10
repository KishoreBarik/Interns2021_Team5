import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/esm/Image";
import { AiFillCloseCircle } from "react-icons/ai";
import AddTool from "../../../Admin/AddTool.js";
import "../../Projects/AdminProjects.css";
import Select from "react-select";
import Navbar from "../../../Navbar/Navbar.js";
import { useNavigate, useLocation } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import SuccessToast from "../../../../../Common/SuccessToast.js";

function AddProject(props) {
  const initialValues = {
    title: "",
    description: "",
    image: "",
    users: [],
    tools: [],
  };
  const initialToolValues = { id: "", title: "", description: "", url: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [toolErrors, settoolErrors] = useState({});
  const [selectedTool, setselectedTool] = useState(initialToolValues);
  const [toolSelected, settoolSelected] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setselectedUsers] = useState([]);
  const [projectUsersJson, setprojectUsersJson] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[3];

  let usersList = [];

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const usersj = await response.json();
    setprojectUsersJson(usersj);
    // console.log(usersj, projectUsersJson);
    usersj.map((user) =>
      usersList.push({ value: user.id, label: user.username })
    );
    setUsers(usersList);
    // console.log(users);
  };

  const fetchProjects = async (id) => {
    const projectId = parseInt(id);
    // console.log(`http://localhost:5000/projects/${projectId}`);
    const response = await fetch(`http://localhost:5000/projects/${projectId}`);
    const project = await response.json();
    // console.log(project);
    // console.log(formValues);
    setformValues(project);
    // console.log(project, formValues);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleToolChanges = (e) => {
    const { name, value } = e.target;
    setselectedTool({ ...selectedTool, [name]: value });
  };

  const finalUsers = () => {
    let usersss = [];
    // console.log(projectUsersJson);
    // console.log(selectedUsers);
    for (var i = 0; i < selectedUsers.length; i++) {
      for (var j = 0; j < projectUsersJson.length; j++) {
        if (selectedUsers[i].value === projectUsersJson[j].id) {
          // console.log("added", projectUsersJson[j]);
          usersss.push(projectUsersJson[j]);
        }
      }
    }
    // console.log(usersss);
    return usersss;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("project users", selectedUsers);
    setformErrors(handleValidation(formValues));

    if (!Object.values(formValues).includes("")) {
      // console.log(projectUsersJson);
      // console.log(selectedUsers);
      formValues["users"] = finalUsers();
      setformValues({ ...formValues });
      // console.log(formValues);
      setformValues(initialValues);
      console.log(formValues);
      navigate("/dashboard");
      SuccessToast(
        currentPath === "addProject"
          ? "Project Added Successfully"
          : "Updated Successfully"
      );
    }
  };

  const handleAddTool = (e) => {
    e.preventDefault();
    // console.log(selectedTool);
    settoolErrors(handletoolValidation(selectedTool));
    if (selectedTool.id === "") {
      // console.log("New tool");
      let dum = { ...selectedTool };
      delete dum.id;
      // console.log(selectedTool, dum);
      if (
        !Object.values(toolErrors).includes("") &&
        !Object.values(dum).includes("")
      ) {
        // console.log("Tool added");
        selectedTool.id = formValues["tools"].length + 1;
        // console.log(selectedTool.id);
        formValues["tools"].push(selectedTool);
        // console.log(toolErrors);
        setformValues({
          ...formValues,
        });
        // console.log(formValues);
        setselectedTool(initialToolValues);
      }
    } else {
      // console.log("Existing tool");
      if (
        !Object.values(selectedTool).includes("") &&
        !Object.values(toolErrors).includes("")
      ) {
        // console.log(toolErrors);
        let toolIndex = formValues["tools"].findIndex(
          (p) => p.id === selectedTool.id
        );
        formValues["tools"][toolIndex] = selectedTool;
        // console.log(toolIndex, formValues["tools"]);
        setformValues({
          ...formValues,
        });
        setselectedTool(initialToolValues);
        // console.log(formValues);
      }
    }
    settoolSelected(false);
  };

  const handleValidation = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
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
    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.url) {
      errors.url = "Url is required!";
    }

    return errors;
  };

  const handleUsers = (selectedOption) => {
    // setprojectUsers()
    // console.log(selectedOption);
    setselectedUsers(selectedOption);
    // console.log(selectedUsers);
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

  useEffect(() => {
    fetchUsers();
    if (currentPath !== "addProject") {
      // console.log("addproject screen");
      fetchProjects(currentPath);
    }
  }, [currentPath]);

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8  my-4">
            <div>
              <div className="d-flex justify-content-between">
                <h4 className="mb-4">
                  {currentPath === "addProject"
                    ? "Add project"
                    : "Edit project"}
                </h4>
                <RiCloseLine
                  size="30px"
                  cursor="pointer"
                  onClick={() => navigate("/dashboard")}
                />
              </div>
              <form>
                <div className="form-group mb-1">
                  <label>
                    <h6>Title</h6>
                  </label>
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
                  <label>
                    <h6>Description</h6>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Enter project description"
                    value={formValues.description}
                    name="description"
                    rows="3"
                    onChange={handleChanges}
                  ></textarea>
                </div>
                <p className="text-danger">{formErrors.description}</p>
                <div className="form-group mb-1">
                  <label>
                    <h6>Image</h6>
                  </label>
                  <input
                    className="form-control"
                    value={formValues.image}
                    placeholder="Enter project image"
                    name="image"
                    onChange={handleChanges}
                    type="text"
                  />
                </div>
                <p className="text-danger">{formErrors.image}</p>
                <label>
                  <h6>Users</h6>
                </label>
                <Select
                  options={users}
                  className="mb-3"
                  placeholder={"Add Users"}
                  isMulti
                  onChange={handleUsers}
                />
                {formValues["tools"].length === 0 ? (
                  <div></div>
                ) : (
                  <div className="mb-4">
                    <label>
                      <h6>Tools</h6>
                    </label>
                    <div className="d-flex gap-2 flex-wrap border p-3 rounded">
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
                  </div>
                )}
                <label>
                  <h6>Add new tool</h6>
                </label>
                <div className="border p-3 rounded mb-4">
                  <AddTool
                    handleChanges={handleToolChanges}
                    toolErrors={toolErrors}
                    toolValues={selectedTool}
                  />
                  <div className="form-group">
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
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
