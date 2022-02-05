import React, { useState,useEffect } from "react";

function AddTool(props) {
  const initialValues = { id:"",title:"", desc: "",url:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedTool,setSelectedTool]=useState({});

  const handleChanges = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setformErrors(handleValidation(formValues));
    setIsSubmit(true);
  };
  useEffect(()=>{
    
    if(Object.keys(formErrors).length===0 && isSubmit){
        console.log(formValues);
        
    }
    setFormValues({...formValues,...props.selectedTool})
    
},[])

  const handleValidation = (values) => {
    const errors = {};
   
    if (!values.title) {
      errors.title = "Tool title is required!";
    } 
    if (!values.desc) {
        errors.title = "Tool Description is required!";
      } 
      if (!values.url) {
        errors.title = "Tool URL is required!";
      } 

    return errors;
  };
  return (
    <div>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6 p-md-4">
          <div className="card shadow-sm bg-white p-4">
          <h6 className="nm-4 text-center fs-1 m-4">{props.title}</h6>
            <form>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control py-md-3"
                  placeholder="Enter tool name"
                  value={formValues.title}
                  
                  name="title"
                  onChange={handleChanges}
                />
              </div>
              <p className="text-danger">{formErrors.title}</p>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Enter tool description"
                  value={formValues.desc}
                 
                  name="desc"
                  rows="3"
                  onChange={handleChanges}
                ></textarea>
              </div>
              <p className="text-danger">{formErrors.desc}</p>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Enter tool URL"
                  value={formValues.url}
                  
                  name="url"
                  rows="1"
                  onChange={handleChanges}
                ></textarea>
              </div>
              <p className="text-danger">{formErrors.url}</p>
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg border-0">
                  Add Tool
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTool;
