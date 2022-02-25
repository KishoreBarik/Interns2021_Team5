import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Context/AuthContext";
import { ProjectsContextProvider } from "./Context/ProjectsContext";
import { UsersContextProvider } from "./Context/UsersContext";

ReactDOM.render(
  <AuthContextProvider>
    <ProjectsContextProvider>
      <UsersContextProvider>
        <Router>
          <App />
        </Router>
      </UsersContextProvider>
    </ProjectsContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
