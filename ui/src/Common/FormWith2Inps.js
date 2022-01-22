import React, { useState } from "react";
import { Link } from "react-router-dom";

function FormWith2Inps(props) {
  const [inp1, setinp1] = useState("");
  const [inp2, setinp2] = useState("");

  return (
    <div className="col-md-4">
      <div className="card shadow bg-white p-4">
        <h3 className="nm-4 text-center fs-1 m-4">{props.title}</h3>
        <form className="mb-3">
          <div className="form-floating mb-3">
            <input
              type={props.inp1Type}
              className="form-control"
              placeholder={props.hint1}
              value={inp1}
              id="email"
              onChange={(e) => setinp1(e.target.value)}
            />
            <label htmlFor="email">{props.hint1}</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type={props.inp2Type}
              className="form-control"
              placeholder={props.hint2}
              value={inp2}
              id="password"
              onChange={(e) => setinp2(e.target.value)}
            />
            <label htmlFor="password">{props.hint2}</label>
          </div>
          <div className="d-grid gap-2 mt-4">
            <button type="button" className="btn btn-primary btn-lg border-0">
              {props.btnName}
            </button>
          </div>
          {props.btnName !== "Login" || (
            <div className="forgot-password-link mt-3 text-right">
              <Link to={"/changepassword"}>Forgot password?</Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormWith2Inps;
