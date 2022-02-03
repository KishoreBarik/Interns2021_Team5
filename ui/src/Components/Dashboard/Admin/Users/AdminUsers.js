import React, { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Image from "react-bootstrap/Image";
import AddUser from "./AddUser/AddUser";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  let userIndex;
  const fetchUsers= async () => {
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();
    setUsers(users);
    console.log(users);
  };

  const editSelected = (id) => {
    userIndex = users.findIndex((p) => p.id === id);
    console.log(users[userIndex]);
    setSelectedUser(users[userIndex]);
    id === selectedUser.id && !open ? setOpen(true) : setOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="my-2">
      <div className="d-flex justify-content-end my-2">
        <button
          onClick={() => setIsAdd(!isAdd)}
          aria-controls="addUser"
          aria-expanded={isAdd}
          className="btn btn-primary float-right"
        >
          {isAdd ? "Cancel" : "Add user"}
        </button>
      </div>
      <Collapse in={isAdd}>
        <div id="addUser" className="bg-light my-2">
          <AddUser title="Add User Form"/>
        </div>
      </Collapse>

      <div className="list-group">
        {users &&
          users.map((user) => (
            <div
              className="list-group-item flex-column align-items-start"
              key={user.id}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <Image
                    src={user.image}
                    className="img-thumbnail"
                    width={50}
                    height={50}
                  />
                  <div className="mx-2">
                    <h6 className="m-0">{user.username}</h6>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mx-2"
                    onClick={() => editSelected(user.id)}
                    aria-controls={user.id}
                    aria-expanded={
                      user.id === selectedUser.id && open === false
                        ? true
                        : false
                    }
                  >
                    {user.id === selectedUser.id && !open
                      ? "Cancel"
                      : "Edit"}
                  </button>
                  <button type="button" className="btn btn-outline-danger">
                    Delete
                  </button>
                </div>
              </div>
              <Collapse
                in={
                  user.id === selectedUser.id && open === false
                    ? true
                    : false
                }
                className="my-3"
              >
                <div id={user.id} className="bg-light">

                      <AddUser selectedUser={selectedUser} title="Edit User Form"/>
                </div>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminUsers;
