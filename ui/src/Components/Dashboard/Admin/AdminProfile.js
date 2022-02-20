import React,{useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import './AdminProfile.css';


function AdminProfile(props) {
    const initialValues={id:'',firstname:'',lastname:'',username:'',email:'',password:'',date:'',gender:''};
    const [formValues,setFormValues]=useState(initialValues);
    const [formErrors,setFormErrors]=useState({});
    const [isSubmit,setIsSubmit]=useState(false);
    const navigate = useNavigate();
   

    const handleChange=(event)=>{
        console.log(event.target);
        const {name,value}=event.target;
        setFormValues(
            {...formValues,[name]:value}
        );
        console.log(formValues);
    }
    // const fetchAdmin = async (id) => {
    //   const adminId = parseInt(id);
    //   console.log(adminId);
    //   const response = await fetch(`http://localhost:5000/users/${adminId}`);
    //   const admin = await response.json();
    //   setFormValues(admin);
    //};
    const handleSubmit=(event)=>{
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
       
    }
    useEffect(async()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length===0 && isSubmit){
            console.log(formValues);
      
        }

        setFormValues({...formValues,...props.selectedUser})
        
    },[formErrors,formValues,isSubmit])
    const fileSelectedHandler=(event)=>{
        console.log(event.target.files[0]);
        const files=event.target.files;
        const formData=new FormData();
        formData.append('img',files[0]);
        fetch("http://localhost:5000/admin",{
          method:"POST",
          body:formData,
         
        }).then((response)=>{
          response.json().then((result)=>{
             console.warn("result",result);
          })
        })
       }
    const validate=(values)=>{
        const errors={};
    
        if(!values.firstname){
            errors.firstname="Firstname is required";
        }
        if(!values.lastname){
            errors.lastname="Lastname is required";
        }
        if(!values.dob){
          errors.dob="Date of birth is required";
      }
        if(!values.username){
            errors.username="Username is required";
        }
        if(!values.password){
            errors.password="Password is required";
        }
        else if(values.password.length < 4){
            errors.password="Password must be more than 4 characters!!!";
        }
        return errors;

    }
 
  

  return(
    <section className="container-fluid">
    <div className="row content d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <form className="mb-3" onSubmit={handleSubmit}>
          <h6 className="nm-4 text-center fs-1 m-4">{props.title}</h6>
          <div className="card shadow-sm bg-white p-4">
          <div className="d-flex justify-content-between">
                <h4>Admin Profile</h4>
                <RiCloseLine
                  size="30px"
                  cursor="pointer"
                  onClick={() => navigate("/dashboard")}
                />
              </div>
          <div className="row">
             <div className="col">
                <label>First Name</label>
                   <input type='text'
                      className='form-control'
                      name='firstname' 
                      placeholder="Admin's Firstname"
                      value={formValues.firstname} 
                      onChange={handleChange}/>
                      <p>{formErrors.firstname}</p>
            </div>
        
            <div className="col">
               <label>Last Name</label>
                 <input  type='text' 
                    className='form-control'
                    name='lastname' 
                    placeholder="Admin's LastName" 
                    value={formValues.lastname} 
                    onChange={handleChange}/>
                    <p>{formErrors.lastname}</p>
           </div>
         </div>   


      <div className="row">
        <div className="col">
          <label>User Name</label>
              <input type='text'
                   className='form-control'
                    name='username' 
                    placeholder="Admin's Username" 
                    value={formValues.username} 
                    onChange={handleChange}/>
                    <p>{formErrors.username}</p>
        </div>
        
        <div className="col">
        <label>Password</label>
                  <input 
                  type='password' 
                  className='form-control'  
                  name='password' 
                  placeholder="Admin's Password" 
                  value={formValues.password} 
                  onChange={handleChange}/>
                  <p>{formErrors.password}</p>
        </div>
      </div>   
              
              <div className='row'>
                 <div className='col'>
                 <div className='form-group'>
              <label>Date of Birth</label>
                  <input  type='date' 
                  className='form-control'
                  name='date' 
                  placeholder='Date of Birth' 
                  value={formValues.date} 
                  onChange={handleChange}/>
                  <p>{formErrors.email}</p>
                  
              </div>
                 </div>
                 <div className='col'>   
                   <label>Gender</label>    
                     <select className="form-select" aria-label="Default select example" >
                       <option value='Male'>Male</option>
                       <option value='Female'>Female</option>
                       <option value="other">Other</option>
 
                     </select>
               </div>
              </div>
              <div>
              <labell>Profile Image</labell>
              <div>
              <input type="file" placeholder='changeImage' onChange={fileSelectedHandler}/>
              </div>
            </div>
            <div className="forgot-password-link mt-3 text-right">
                <Link to={"/forgotpassword"}>Forgot password?</Link>
              </div>
               
                
            <div className='text-center'>
              <button type='submit' className='btn-sm btn-primary'>Save</button>
              </div>
              
          </div>  
      </form>
      
      </div>
      
    </div>
    </section>
  );
  
}

export default AdminProfile;
