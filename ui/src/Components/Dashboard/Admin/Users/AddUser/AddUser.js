import React, { useEffect, useState } from "react";
import Navbar from "../../../Navbar/Navbar.js";
import { useNavigate, useLocation } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import SuccessToast from "../../../../../Common/SuccessToast.js";
import Loading from "../../../../../Common/Loading/Loading.js";

function AddUser(props) {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    date: "",
    gender: "Male",
  };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[3];

  const fetchUser = async (id) => {
    const response = await fetch(`http://localhost:5000/users/${parseInt(id)}`);
    const user = await response.json();
    setformValues(user);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setformErrors(handleValidation(formValues));
    if (!Object.values(formValues).includes("")) {
      formValues.id = formValues.id === undefined ? Date.now() : formValues.id;
      setformValues({ ...formValues });
      setformValues(initialValues);
      console.log("user formvalues ", formValues);
      console.log(
        formValues.id === undefined ? "error" : Date.now() + formValues.id
      );
      if (currentPath === "addUser") {
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }).then((result)=>{
          result.json().then((response)=>{
            console.warn(response);
            fetchUser();
          })
        })
      }else {
        fetch(`http://localhost:5000/users/${currentPath}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
      }
      navigate("/dashboard");
      SuccessToast(
        currentPath === "addUser"
          ? "User Added Successfully"
          : "Updated Successfully"
      );
    }
  };

  const handleValidation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Firstname is required";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required";
    }
    if (!values.date) {
      errors.date = "Date of birth is required";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not valid!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!!!";
    }
    return errors;
  };

  useEffect(() => {
    if (currentPath !== "addUser") {
      fetchUser(currentPath);
    }
  }, [currentPath]);

  return (
    <div>
      <Navbar />
      {Object.values(formValues).includes("") && currentPath !== "addUser" ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className="row content d-flex justify-content-center align-items-center">
            <div className="col-md-8  my-4">
              <div>
                <div className="d-flex justify-content-between">
                  <h4 className="mb-4">
                    {currentPath === "addUser" ? "Add user" : "Edit user"}
                  </h4>
                  <RiCloseLine
                    size="30px"
                    cursor="pointer"
                    onClick={() => navigate("/dashboard")}
                  />
                </div>
                <form>
                  <div className="card shadow-sm bg-white p-4">
                    <div className="row">
                      <div className="col">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstname"
                          placeholder="Firstname"
                          value={formValues.firstname}
                          onChange={handleChanges}
                        />
                        <p className="text-danger">{formErrors.firstname}</p>
                      </div>

                      <div className="col">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastname"
                          placeholder="Last Name"
                          value={formValues.lastname}
                          onChange={handleChanges}
                        />
                        <p className="text-danger">{formErrors.firstname}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label>User Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Username"
                          value={formValues.username}
                          onChange={handleChanges}
                        />
                        <p className="text-danger">{formErrors.username}</p>
                      </div>

                      <div className="col">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={formValues.password}
                          onChange={handleChanges}
                        />
                        <p className="text-danger">{formErrors.password}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          placeholder="Date"
                          value={formValues.date}
                          onChange={handleChanges}
                        />
                        <p className="text-danger">{formErrors.date}</p>
                      </div>

                      <div className="col">
                        <label>Gender</label>
                        <select
                          className="form-select"
                          name="gender"
                          value={formValues.gender}
                          onChange={handleChanges}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group mb-1">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChanges}
                      />
                    </div>
                    <p className="text-danger">{formErrors.email}</p>

                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
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

export default AddUser;
