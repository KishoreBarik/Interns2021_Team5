<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
=======
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";


ReactDOM.render(
  <AuthContextProvider>
  <Router>
    <App />
  </Router>
  </AuthContextProvider>,
  document.getElementById("root")
);
>>>>>>> admin-projects-part
