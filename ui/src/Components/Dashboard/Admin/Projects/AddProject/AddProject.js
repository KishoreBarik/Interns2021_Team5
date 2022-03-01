import React, { useContext, useEffect, useState } from "react";
import Image from "react-bootstrap/esm/Image";
import { AiFillCloseCircle } from "react-icons/ai";
import AddTool from "../../../Admin/AddTool.js";
import "../../Projects/AdminProjects.css";
import Select from "react-select";
import Navbar from "../../../Navbar/Navbar.js";
import { useNavigate, useLocation } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import SuccessToast from "../../../../../Common/SuccessToast.js";
import errorImage from "../../../../../Assets/no-image.png";
import UsersContext from "../../../../../Context/UsersContext.js";
import Loading from "../../../../../Common/Loading/Loading.js";

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

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[3];

  const usersCtx = useContext(UsersContext);

  const fetchProject = async (id) => {
    const response = await fetch(
      `http://localhost:5000/projects/${parseInt(id)}`
    );
    const project = await response.json();

    console.log(project.users);
    let projectusers = [];
    project.users?.map((user) =>
      projectusers.push({ value: user.id, label: user.username })
    );
    setselectedUsers(projectusers);
    setformValues(project);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleToolChanges = (e) => {
    const { name, value } = e.target;
    setselectedTool({ ...selectedTool, [name]: value });
  };

  let usersList = [];

  const fetchUsers = async () => {
    usersCtx.users.map((user) =>
      usersList.push({ value: user.id, label: user.username })
    );
    setUsers(usersList);
  };

  const finalUsers = () => {
    let usersss = [];

    for (var i = 0; i < selectedUsers.length; i++) {
      for (var j = 0; j < usersCtx.users.length; j++) {
        if (selectedUsers[i].value === usersCtx.users[j].id) {
          usersss.push(usersCtx.users[j]);
        }
      }
    }

    return usersss;
  };

  const handleUsers = (selectedOption) => {
    setselectedUsers(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(handleValidation(formValues));

    if (!Object.values(formValues).includes("")) {
      formValues["users"] = finalUsers();
      formValues.id = formValues.id === undefined ? Date.now() : formValues.id;
      setformValues({ ...formValues });
      setformValues(initialValues);
      console.log(formValues);
      if (currentPath === "addProject") {
        fetch("http://localhost:5000/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
      } else {
        fetch(`http://localhost:5000/projects/${currentPath}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
      }
      navigate("/dashboard/projects");
      SuccessToast(
        currentPath === "addProject"
          ? "Project Added Successfully"
          : "Updated Successfully"
      );
    }
  };

  const handleAddTool = (e) => {
    e.preventDefault();

    settoolErrors(handletoolValidation(selectedTool));
    if (selectedTool.id === "") {
      let dum = { ...selectedTool };
      delete dum.id;

      if (
        !Object.values(toolErrors).includes("") &&
        !Object.values(dum).includes("")
      ) {
        selectedTool.id = formValues["tools"].length + 1;
        formValues["tools"].push(selectedTool);
        setformValues({
          ...formValues,
        });
        setselectedTool(initialToolValues);
      }
    } else {
      if (
        !Object.values(selectedTool).includes("") &&
        !Object.values(toolErrors).includes("")
      ) {
        let toolIndex = formValues["tools"].findIndex(
          (p) => p.id === selectedTool.id
        );
        formValues["tools"][toolIndex] = selectedTool;
        setformValues({
          ...formValues,
        });
        setselectedTool(initialToolValues);
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
      fetchProject(currentPath);
    }
  }, [currentPath]);

  return (
    <div>
      <Navbar />
      {Object.values(formValues).includes("") &&
      currentPath !== "addProject" ? (
        <Loading />
      ) : (
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
                    onClick={() => navigate("/dashboard/projects")}
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
                    value={selectedUsers}
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
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src = errorImage;
                                    }}
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
      )}
    </div>
  );
}

export default AddProject;
