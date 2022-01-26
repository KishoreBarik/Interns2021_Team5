import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css";

function ForgotPassword() {
  const [emailValue, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setemailError(handleValidation(emailValue));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(emailError);
    if (emailError.length === "" && isSubmit) {
      alert("Success");
    }
  }, [emailError]);

  const handleValidation = (email) => {
    let error = "";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      error = "Email is required!";
    } else if (!regex.test(email)) {
      error = "This is not a valid email format!";
    }
    return error;
  };

  return (
    <section className="container-fluid">
      <div className="row content d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card shadow-sm bg-white p-4">
            <h3 className="nm-4 text-center fs-1 m-4">Forgot Password</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  value={emailValue}
                  id="email"
                  onChange={handleChanges}
                />
                <label htmlFor="email">Enter your email address</label>
              </div>
              <p className="text-danger">{emailError}</p>
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

export default ForgotPassword;
