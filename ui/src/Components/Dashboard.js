import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import Categories from "./Admin/Categories";
import Navbar from "./Navbar/Navbar";
import Projects from "./Projects/Projects";

function Dashboard(props) {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      {authCtx.loggedEmail === "toolpot@gmail.com" ? (
        <Categories />
      ) : (
        <Projects />
      )}
    </div>
  );
}

export default Dashboard;