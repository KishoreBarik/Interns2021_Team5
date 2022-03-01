import React, { useContext, useEffect, useState } from "react";
import Loading from "../../Common/Loading/Loading";
import AuthContext from "../../Context/AuthContext";
import Categories from "./Admin/Categories";
import Navbar from "./Navbar/Navbar";
import Projects from "./Projects/Projects";

function Dashboard(props) {
  const authCtx = useContext(AuthContext);

  return (
    <div
      className={"overflow-hidden"}
      style={{
        height: "100vh",
      }}
    >
      <Navbar />
      {!authCtx.loggedAccount.email ? (
        <Loading />
      ) : authCtx.loggedAccount.email === authCtx.adminEmail ? (
        <Categories />
      ) : (
        <Projects />
      )}
    </div>
  );
}

export default Dashboard;
