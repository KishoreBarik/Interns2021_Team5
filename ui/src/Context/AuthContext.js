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
  const [loggedAccount, setLoggedAccount] = useState({});
  const [loggedInData, setLoggedInData] = useState({});
  const [loggedOutData, setLoggedOutData] = useState({});
  const [adminEmail, setadminEmail] = useState(
    "langworth.leopoldo@example.org"
  );

  const fetchLogged = async (email) => {
    const response = await fetch(`http://localhost:5000/users/?email=${email}`);
    const loggedAccount = await response.json();
    setloggedUser(loggedAccount[0]);
  };

  const login = async (email, password) => {
    var details = {
      email: email,
      password: password,
      client_id: 1,
      client_secret: "N2ncoJkAwTCfaLn0mmhBM4xZ6hxiRyC0ywjgwkQc",
      scope: "",
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    const loggeduser = await response.json();
    setLoggedInData(loggeduser);
    setLoggedAccount(loggeduser.user);
    localStorage.setItem("loggedAccount", JSON.stringify(loggeduser.user));
    localStorage.setItem("loggedInData", JSON.stringify(loggeduser));
  };

  const logout = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loggedInData.token}`,
      },
    });

    const logoutRes = await response.json();
    setLoggedOutData(logoutRes);
    setLoggedAccount(logoutRes);
    // localStorage.setItem("loggedOutData", JSON.stringify(logoutRes));
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");
    const storedPass = localStorage.getItem("pass");
    const storedAccount = localStorage.getItem("loggedAccount");
    const storedloggedInData = localStorage.getItem("loggedInData");
    // const storedloggedOutData = localStorage.getItem("loggedOutData");
    // console.log(storedloggedInData);

    if (storedIsLoggedIn === "true") {
      setisLoggedIn(true);
      fetchLogged(storedEmail);
      setloggedEmail(storedEmail);
      setadminEmail("langworth.leopoldo@example.org");
      setloggedPass(storedPass);
      setLoggedAccount(JSON.parse(storedAccount));
      setLoggedInData(JSON.parse(storedloggedInData));
      // setLoggedOutData(JSON.parse(storedloggedOutData));
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("pass", password);

    setloggedEmail(email);
    setloggedPass(password);
    setisLoggedIn(true);
    login(email, password);
    fetchLogged(email);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("pass");
    localStorage.removeItem("loggedAccount");
    localStorage.removeItem("loggedInData");
    localStorage.removeItem("loggedOutData");
    logout();
    setisLoggedIn(false);
    setLoggedAccount({});
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
        loggedAccount: loggedAccount,
        adminEmail: adminEmail,
        loggedInData: loggedInData,
        loggedOutData: loggedOutData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
