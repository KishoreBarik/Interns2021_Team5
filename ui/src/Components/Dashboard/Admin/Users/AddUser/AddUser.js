import React, { useEffect, useState } from "react";
import Navbar from "../../../Navbar/Navbar.js";
import { useNavigate, useLocation } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import SuccessToast from "../../../../../Common/SuccessToast.js";

function AddUser(props) {
  const initialValues = {
    id: "",
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    date: "",
    gender: "",
  };
  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[3];


  const fetchUsers = async (id) => {
    const userId = parseInt(id);
    console.log(userId);
    const response = await fetch(`http://localhost:5000/users/${userId}`);
    const user = await response.json();
    setformValues(user);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };


  const postUser=async()=>{
    console.warn(formValues);
    const userId=JSON.parse(localStorage.getItem('users'));
    let result=await fetch("http://localhost:5000/users",{
      method:"POST",
      body:JSON.stringify({...formValues,userId}),
      headers:{
        "Content-Type":"application/json"
      }
   });
   result=await result.json();
   console.warn(result);
   fetchUsers();
   setformErrors(handleValidation(formValues));
   if (!Object.values(formValues).includes("")) {
       setformValues({ ...formValues });
       setformValues(initialValues);
       console.log(formValues);
       navigate("/dashboard");
       SuccessToast(
         currentPath === "addUser"
           ? "User Added Successfully"
           : "Updated Successfully"
       );
     }

  }

  const handleValidation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Firstname is required";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required";
    }
    if (!values.dob) {
      errors.dob = "Date of birth is required";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not valid!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!!!";
    }
    return errors;
  };

  useEffect(() => {
    fetchUsers();
    if (currentPath !== "addUser") {

      fetchUsers(currentPath);
    }
    console.log(currentPath);
  }, [currentPath]);

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8  my-4">
            <div>
              <div className="d-flex justify-content-between">
                <h4 className="mb-4">
                  {currentPath === "AddUser"
                    ? "Add user"
                    : "Edit user"}
                </h4>
                <RiCloseLine
                  size="30px"
                  cursor="pointer"
                  onClick={() => navigate("/dashboard")}
                />
              </div>
              <form>
              <div className="card shadow-sm bg-white p-4">
                  <div className="row">
                       <div className="col">
                           <label>First Name</label>
                               <input type='text'
                                 className='form-control'
                                 name='firstname' 
                                 placeholder='Firstname' 
                                 value={formValues.firstname} 
                                 onChange={handleChanges}/>
                                <p className="text-danger">{formErrors.firstname}</p>
                       </div>
        
                       <div className="col">
                           <label>Last Name</label>
                               <input  type='text' 
                                 className='form-control'
                                 name='lastname' 
                                 placeholder='Last Name' 
                                 value={formValues.lastname} 
                                 onChange={handleChanges}/>
                                <p className="text-danger">{formErrors.firstname}</p>
                   
                        </div>
                   </div>  
                   <div className="row">
                       <div className="col">
                           <label>User Name</label>
                               <input type='text'
                                 className='form-control'
                                 name='username' 
                                 placeholder='Username' 
                                 value={formValues.username} 
                                 onChange={handleChanges}/>
                                <p className="text-danger">{formErrors.username}</p>
                       </div>
        
                       <div className="col">
                         <label>Password</label>
                           <input type="password"
                              className="form-control"
                              name="password"
                              placeholder="Password"
                              value={formValues.password}
                              onChange={handleChanges}/>
                              <p className="text-danger">{formErrors.password}</p>

                       </div>
                    </div> 
                    <div className="row">
                       <div className="col">
                           <label>Date of Birth</label>
                              <input
                                type="date"
                                className="form-control"
                                name="date"
                                placeholder="Date"
                                value={formValues.date}
                                onChange={handleChanges}
                                />
                              <p className="text-danger">{formErrors.dob}</p>
                            
                        </div>
        
                       <div className="col">
                         <label>Gender</label>
                         <select
                              className="form-select"
                              aria-label="Default select example"
                              value={formValues.gender}
                              onChange={handleChanges}

                         >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="other">Other</option>
                         </select>
                       </div>
                    </div>   
                  <div className="form-group mb-1">
                      <label>Email</label>
                      <input
                         type="email"
                         className="form-control"
                         name="email"
                         placeholder="Email"
                         value={formValues.email}
                         onChange={handleChanges}
                     />
                </div> 
                <p className="text-danger">{formErrors.email}</p>
                     
                   
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={postUser}
                  >
                    Save
                  </button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
}

export default AddUser;
