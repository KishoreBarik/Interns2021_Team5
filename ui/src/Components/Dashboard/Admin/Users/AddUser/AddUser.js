import React,{useState,useEffect} from 'react';
import './AddUser.module.css';



function AddUser(props) {
    const initialValues={id:'',firstname:'',lastname:'',username:'',email:'',password:'',date:'',gender:''};
    const [formValues,setFormValues]=useState(initialValues);
    const [formErrors,setFormErrors]=useState({});
    const [isSubmit,setIsSubmit]=useState(false);
   
    const handleChange=(event)=>{
        console.log(event.target);
        const {name,value}=event.target;
        setFormValues(
            {...formValues,[name]:value}
        );
        console.log(formValues);
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
       
    }
    useEffect(()=>{
        console.log(formErrors);
        if(Object.keys(formErrors).length===0 && isSubmit){
            console.log(formValues);
            
        }
        setFormValues({...formValues,...props.selectedUser})
        
    },[formErrors,formValues,isSubmit])
    const validate=(values)=>{
        const errors={};
        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
        if(!values.email){
            errors.email="Email is required";
        }
        else if(!regex.test(values.email)){
            errors.email="Email is not valid!";
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
          <div className="row">
             <div className="col">
                <label>First Name</label>
                   <input type='text'
                      className='form-control'
                      name='firstname' 
                      placeholder='Firstname' 
                      value={formValues.firstname} 
                      onChange={handleChange}/>
                      <p>{formErrors.firstname}</p>
            </div>
        
            <div className="col">
               <label>Last Name</label>
                 <input  type='text' 
                    className='form-control'
                    name='lastname' 
                    placeholder='Last Name' 
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
                    placeholder='Username' 
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
                  placeholder='Password' 
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
                  placeholder='Date' 
                  value={formValues.date} 
                  onChange={handleChange}/>
                  <p>{formErrors.email}</p>
                  
              </div>
                 </div>
                 <div className='col'>   
                   <label>Gender</label>    
                     <select className="form-select" aria-label="Default select example" value={formValues.gender}>
                       <option value='Male'>Male</option>
                       <option value='Female'>Female</option>
                       <option value="other">Other</option>
 
                     </select>
               </div>
              </div>
               <div className='form-group'>
              <label>Email</label>
                  <input  type='email' 
                  className='form-control'
                  name='email' 
                  placeholder='Email' 
                  value={formValues.email} 
                  onChange={handleChange}/>
                  <p>{formErrors.email}</p>
                  
              </div>
            
               
              <div className='text-center'>
              <button type='submit' className='btn-sm btn-primary'>Add User</button>
              </div>
              
          </div>  
      </form>
      
      </div>
      
    </div>
    </section>
  );
}

export default AddUser;
