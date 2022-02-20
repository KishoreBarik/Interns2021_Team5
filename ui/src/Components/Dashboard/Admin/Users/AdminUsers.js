import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Image from "react-bootstrap/Image";
import "./AdminUsers.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
toast.configure();
function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
 const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const users = await response.json();
    setUsers(users);
  };

  const editSelected = (id) => {
    navigate(`/dashboard/users/${id}`);
   
  };

  const AddUser = () => {
    navigate(`/dashboard/users/AddUser`);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const deleteUser=(id)=>{
  if(window.confirm("Are you sure you want to delete?"))
  {
    fetch(`http://localhost:5000/users/${id}`,{
      method:"DELETE",
      header:{'Accept':'application/json',
      'Content-Type':'application/json'
      }
     
    }).then((result)=>{
      result.json().then((response)=>{
        console.warn(response);
        fetchUsers();
      })
  
  })
  
}
} 

  return (
    <>
      <div className="my-2">
        <div>
          <div className="d-flex justify-content-end my-2">
            <button
              type="button"
              onClick={AddUser}
              className="btn btn-primary float-right"
            >
              Add user
            </button>
          </div>
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
                        src={"https://i.stack.imgur.com/34AD2.jpg"}
                        className="img-thumbnail"
                        width={50}
                        height={50}
                      />
                      <div className="mx-2">
                        <h6 className="m-0">{user.username}</h6>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => editSelected(user.id)}
                      >
                        <BiEdit size={20} />
                      </button>
                     
                      <button type="button" onClick={()=>deleteUser(user.id)} className="btn btn-outline-danger">
                        <MdDelete size={20} />
                      </button>
                    
                    </div>
                   
                  </div>
                  
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;