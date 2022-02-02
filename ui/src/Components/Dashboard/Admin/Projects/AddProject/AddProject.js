import React, { useState } from "react";

function AddProject() {
  const initialValues = { title: "", desc: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(handleValidation(formValues));
    setIsSubmit(true);
  };

  const handleValidation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.title) {
      errors.title = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.title = "This is not a valid email format!";
    }

    return errors;
  };
  return (
    <div>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6 p-md-4">
          <div className="card shadow-sm bg-white p-4">
            <form>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control py-md-3"
                  placeholder="Enter project title"
                  value={formValues.title}
                  id="title"
                  name="title"
                  onChange={handleChanges}
                />
              </div>
              <p className="text-danger">{formErrors.title}</p>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Enter project description"
                  value={formValues.desc}
                  id="desc"
                  name="desc"
                  rows="3"
                  onChange={handleChanges}
                ></textarea>
              </div>
              <p className="text-danger">{formErrors.password}</p>
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg border-0">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
