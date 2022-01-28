import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    console.log("isLoggedIn = ", storedIsLoggedIn);
    if (storedIsLoggedIn === "true") {
      setisLoggedIn(true);
    }
  }, []);
  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("pass", password);

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
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
