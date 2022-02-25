import React,{useContext} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

function Navbar() {
  const authCtx = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/dashboard"} className="navbar-brand">
          Tools pot
        </Link>
        <div>
          <ul className="nav navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <img
                src="https://i.stack.imgur.com/34AD2.jpg"
                width="50"
                height="50"
                alt="profile_icon"
                className="nav-link dropdown-toggle rounded-circle"
                style={{ cursor: "pointer" }}
                data-bs-toggle="dropdown"
              ></img>
              <div className="dropdown-menu dropdown-menu-end">
                <Link to={"/changepassword"} className="dropdown-item">
                  Change password
                </Link>
                <div className="dropdown-divider"></div>
                
                <Link to={"/dashboard/admin/1"} className="dropdown-item">
                  Profile
                </Link>
                <div className="dropdown-divider"></div>
                <div onClick={authCtx.onLogout} className="dropdown-item">
                  Logout
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
