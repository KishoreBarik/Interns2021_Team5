import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loggedEmail, setloggedEmail] = useState("");
  const [loggedPass, setloggedPass] = useState("");

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");

    console.log("isLoggedIn = ", storedIsLoggedIn);
    console.log("email = ", storedEmail);
    if (storedIsLoggedIn === "true") {
      setisLoggedIn(true);
      setloggedEmail(storedEmail);
    }
  }, []);
  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("pass", password);
    setloggedEmail(email);
    setloggedPass(password);
    setisLoggedIn(true);
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
