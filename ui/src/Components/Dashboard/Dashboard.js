import React, { useContext } from "react";
import Loading from "../../Common/Loading/Loading";
import AuthContext from "../../Context/AuthContext";
import Categories from "./Admin/Categories";
import Navbar from "./Navbar/Navbar";
import Projects from "./Projects/Projects";

function Dashboard(props) {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const widget =
    authCtx.loggedEmail === "toolpot@gmail.com" ? <Categories /> : <Projects />;
  return (
    <div>
      <Navbar />
      {!authCtx.loggedUser ? <Loading /> : widget}
    </div>
  );
}

export default Dashboard;
