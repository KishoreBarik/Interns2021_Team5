import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loggedUser, setloggedUser] = useState({});
  const [loggedEmail, setloggedEmail] = useState("");
  const [loggedPass, setloggedPass] = useState("");

  const fetchLogged = async (email) => {
    const response = await fetch(`http://localhost:5000/users/?email=${email}`);
    const loggedAccount = await response.json();
    setloggedUser(loggedAccount[0]);
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");
    const storedPass = localStorage.getItem("pass");

    if (storedIsLoggedIn === "true") {
      setisLoggedIn(true);
      fetchLogged(storedEmail);
      setloggedEmail(storedEmail);
      setloggedPass(storedPass);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("pass", password);
    setloggedEmail(email);
    setloggedPass(password);
    setisLoggedIn(true);
    fetchLogged(email);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("pass");
    setisLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        loggedEmail: loggedEmail,
        loggedPass: loggedPass,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        loggedUser: loggedUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
