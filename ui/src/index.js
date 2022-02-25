import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import { UsersContextProvider } from "./Context/UsersContext";


ReactDOM.render(
  <AuthContextProvider>
    <UsersContextProvider>
      <Router>
        <App />
      </Router>
    </UsersContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
