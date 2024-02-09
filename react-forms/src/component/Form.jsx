// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";


const initialState = {
  fname: "",
  lname: "",
  email:"",
  phone:""
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormErrors] = useState({});
  const [registerStatus,setRegisterStatus]=useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateData = (data) => {
    const errors = {};
    const { fname, lname ,email,phone} = data;

    if (fname.trim() === "") {
      errors.fname = "Please enter your first name!";
    }else if(!/^[a-zA-Z]+$/.test(fname)){
        errors.fname = "Please enter valid first name!";

    }

    if (lname.trim() === "") {
      errors.lname = "Please enter your last name!";
    }
    if (email.trim() === ""){
        errors.email = "Please enter your email!";
    }else if (
        !/^\S+@\S+\.\S+$/.test(email)
    ){
        errors.email = "Please enter valid email!";
    }
    if(phone.trim() === "" || !/^\d+$/.test(phone)){
        errors.phone = "Please enter your phone number!";
    }else if(phone.split("").length != 10){
        errors.phone = "Please enter 10-digit phone number!";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateData(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length===0){
        setRegisterStatus(true);
    }else{
        setRegisterStatus(false);
    }

    console.log(formData);
  };

  return (
    <div className="form-container">
    {registerStatus && <h2 className="success-message">Registration Sucessful.</h2>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
          {formError.fname && <p className="error-message">{formError.fname}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
          {formError.lname && <p className="error-message">{formError.lname}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formError.email && <p className="error-message">{formError.email}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {formError.phone && <p className="error-message">{formError.phone}</p>}
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Form;