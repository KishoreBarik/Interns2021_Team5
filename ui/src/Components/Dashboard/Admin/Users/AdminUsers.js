import React, { useContext, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Image from "react-bootstrap/Image";
import "./AdminUsers.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import errorImage from "../../../../Assets/no-image.png";
import UsersContext from "../../../../Context/UsersContext";
import Loading from "../../../../Common/Loading/Loading";

toast.configure();
function AdminUsers() {
  const navigate = useNavigate();
  const [selectedUserId, setselectedUserId] = useState();

  const usersCtx = useContext(UsersContext);

  const editSelected = (id) => {
    navigate(`/dashboard/users/${id}`);
  };

  const AddUser = () => {
    navigate(`/dashboard/users/addUser`);
  };

  useEffect(() => {
    console.log("fetching users...");
    usersCtx.fetchUsers();
  }, []);

  const setselectedUser = (id) => {
    setselectedUserId(id);
    console.log(id, selectedUserId);
  };

  return (
    <>
      {!usersCtx.users ? (
        <Loading />
      ) : (
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
                {usersCtx.users &&
                  usersCtx.users.map((user) => (
                    <div
                      className="list-group-item flex-column align-items-start"
                      key={user.id}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Image
                            src={"https://i.stack.imgur.com/34AD2.jpg"}
                            className="img-thumbnail"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = errorImage;
                            }}
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

                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={() => setselectedUser(user.id)}
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="deleteModal"
            tabIndex="-1"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <h5
                    className="modal-title m-4 text-center"
                    id="deleteModalLabel"
                  >
                    Are you sure want to delete this user?
                  </h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => usersCtx.deleteUser(selectedUserId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminUsers;
