import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(handleValidation(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/changepassword");
    }
  }, [formErrors]);

  const handleValidation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };
  return (
    <section className="container-fluid">
      <div className="row content d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card shadow-sm bg-white p-4">
            <h3 className="nm-4 text-center fs-1 m-4">Login</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="form-floating mb-3 outline-none">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={formValues.email}
                  id="email"
                  onChange={handleChanges}
                />
                <label htmlFor="email">Enter your email address</label>
              </div>
              <p className="text-danger">{formErrors.email}</p>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formValues.password}
                  id="password"
                  onChange={handleChanges}
                />
                <label htmlFor="password">Enter your password</label>
              </div>
              <p className="text-danger">{formErrors.password}</p>
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-primary btn-lg border-0">
                  Login
                </button>
              </div>
              <div className="forgot-password-link mt-3 text-right">
                <Link to={"/forgotpassword"}>Forgot password?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
