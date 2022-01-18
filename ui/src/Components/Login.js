import React from "react";
import FormWith2Inps from "../Common/FormWith2Inps";
import "./Login.css";

function Login() {
  return (
    <section className="container-fluid">
      <div className="row content d-flex justify-content-center align-items-center">
        <FormWith2Inps title="Login" />
      </div>
    </section>
  );
}

export default Login;
