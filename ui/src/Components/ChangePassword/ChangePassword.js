import React, { useEffect, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

function ChangePassword() {
  const initialValues = { pass1: "", pass2: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [pass1Show, setpass1Show] = useState(false);
  const [pass2Show, setpass2Show] = useState(false);

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
      navigate("/dashboard");
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

  const togglePassword1 = () => {
    setpass1Show(pass1Show ? false : true);
  };
  const togglePassword2 = () => {
    setpass2Show(pass2Show ? false : true);
  };
  return (
    <section className="container-fluid">
      <div className="row content d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card shadow-sm bg-white p-4">
            <h3 className="nm-4 text-center fs-1 m-4">Change Password</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                {/* <label htmlFor="pass1">Password</label> */}
                <div className="input-group">
                  <input
                    type={pass1Show ? "text" : "password"}
                    name="pass1"
                    className="form-control"
                    placeholder="Enter new password"
                    value={formValues.pass1}
                    id="pass1"
                    onChange={handleChanges}
                    data-toggle="pass1"
                  />
                  <div
                    className="input-group-append"
                    onClick={() => togglePassword1()}
                  >
                    <div className="input-group-text p-3">
                      {pass1Show ? <RiEyeLine /> : <RiEyeOffLine />}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-danger">{formErrors.pass1}</p>
              <div className="form-group mb-3">
                {/* <label htmlFor="pass2">Confirm password</label> */}
                <div className="input-group mt-1">
                  <input
                    type={pass2Show ? "text" : "password"}
                    name="pass2"
                    className="form-control"
                    placeholder="Re-enter new password"
                    value={formValues.pass2}
                    id="pass2"
                    onChange={handleChanges}
                    data-toggle="pass2"
                  />
                  <div
                    className="input-group-append"
                    onClick={() => togglePassword2()}
                  >
                    <div className="input-group-text p-3">
                      {pass2Show ? <RiEyeLine /> : <RiEyeOffLine />}
                    </div>
                  </div>
                </div>
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
