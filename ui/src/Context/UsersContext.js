import { createContext, useEffect, useState } from "react";

const UsersContext = createContext({
  users: null,
});

export const UsersContextProvider = (props) => {
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();
    setUsers(users);
  };

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      fetchUsers();
    }
    return () => {
      setUsers(null);
    };
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users: users,
        fetchUsers: fetchUsers,
        deleteUser: deleteUser,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
