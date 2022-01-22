import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

function ChangePassword() {
  const initialValues = { pass1: "", pass2: "" };
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
      alert("Success");
    }
  }, [formErrors]);

  const handleValidation = (values) => {
    const errors = {};

    if (!values.pass1) {
      errors.pass1 = "Password is required";
    } else if (values.pass1.length < 4) {
      errors.pass1 = "Password must be more than 4 characters";
    }
    if (values.pass2 !== values.pass1) {
      errors.pass2 = "Re-enter the same password";
    }
    return errors;
  };
  return (
    <section className="container-fluid">
      <div className="row content d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card shadow-sm bg-white p-4">
            <h3 className="nm-4 text-center fs-1 m-4">Change Password</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="pass1"
                  className="form-control"
                  placeholder="Enter new password"
                  value={formValues.pass1}
                  id="pass1"
                  onChange={handleChanges}
                />
                <label htmlFor="pass1">Enter new password</label>
              </div>
              <p className="text-danger">{formErrors.pass1}</p>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="pass2"
                  className="form-control"
                  placeholder="Re-enter new password"
                  value={formValues.pass2}
                  id="pass2"
                  onChange={handleChanges}
                />
                <label htmlFor="pass2">Re-enter new password</label>
              </div>
              <p className="text-danger">{formErrors.pass2}</p>
              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-primary btn-lg border-0">
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
