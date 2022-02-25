import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./AdminProfile.css";
import SuccessToast from "../../../Common/SuccessToast";
import Navbar from "../Navbar/Navbar";

function AdminProfile(props) {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    date: "",
    gender: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[3];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fetchAdmin = async (id) => {
    const response = await fetch(`http://localhost:5000/admin/${parseInt(id)}`);
    const admin = await response.json();
    setFormValues(admin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));

    if (!Object.values(formValues).includes("")) {
      formValues.id = formValues.id === undefined ? Date.now() : formValues.id;
      setFormValues({ ...formValues });
      setFormValues(initialValues);
      fetch(`http://localhost:5000/admin/${currentPath}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      navigate("/dashboard");
      SuccessToast("Updated Successfully");
    }
  };

  useEffect(() => {
    fetchAdmin(currentPath);
  }, [currentPath]);

  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = "Firstname is required";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required";
    }
    if (!values.dob) {
      errors.dob = "Date of birth is required";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!!!";
    }
    return errors;
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid ">
        <div className="row content d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <form className="mb-3">
              <h6 className="nm-4 text-center fs-1 m-4">{props.title}</h6>
              <div className="card shadow-sm bg-white p-4">
                <div className="d-flex justify-content-between">
                  <h4>Admin Profile</h4>
                  <RiCloseLine
                    size="30px"
                    cursor="pointer"
                    onClick={() => navigate("/dashboard")}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      placeholder="Admin's Firstname"
                      value={formValues.firstname}
                      onChange={handleChange}
                    />
                    <p>{formErrors.firstname}</p>
                  </div>

                  <div className="col">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      placeholder="Admin's LastName"
                      value={formValues.lastname}
                      onChange={handleChange}
                    />
                    <p>{formErrors.lastname}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label>User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Admin's Username"
                      value={formValues.username}
                      onChange={handleChange}
                    />
                    <p>{formErrors.username}</p>
                  </div>

                  <div className="col">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Admin's Password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <p>{formErrors.password}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        placeholder="Date of Birth"
                        value={formValues.date}
                        onChange={handleChange}
                      />
                      <p>{formErrors.date}</p>
                    </div>
                  </div>
                  <div className="col">
                    <label>Gender</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                {/* <div>
                <labell>Profile Image</labell>
                <div>
                <input
                    type="file"
                    placeholder="changeImage"
                    onChange={fileSelectedHandler}
                  />
                </div>
              </div> */}
                <div className="forgot-password-link mt-3 text-right">
                  <Link to={"/forgotpassword"}>Forgot password?</Link>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
