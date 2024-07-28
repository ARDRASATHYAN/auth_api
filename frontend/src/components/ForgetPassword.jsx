import React, { useState } from 'react'
import { Button, Container, ErrorMessage, FormWrapper, Input, Title } from '../styles/Formstyle';
import axios from 'axios'
import { ToastContainer, toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {
  const [formData, setFormData] = useState({  email: '' });
    const [errors, setErrors] = useState({});
  
    const validate = () => {
      let errors = {};
   
      if (!formData.email) errors.email = 'Email is required';
    
      return errors;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  console.log(formData);
    const handleSubmit = (e) => {
      console.log('hi');
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length === 0) {
        axios.post('http://localhost:5000/user/forgetpassword', formData)
        .then(response => {
          toast.success('link send in console', {
            position:"top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
            });
       
          console.log('Form submitted:', response.data);
        })
        .catch(error => {
          const errorMsg = error.response && error.response.data ? error.response.data.message : error.message;
          toast.error(`Error: ${errorMsg}`, {
              position:"top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              });
        
          console.error('There was an error registering the user:', error);
        });
       //api and there response
      } else {
        setErrors(validationErrors);
      }
    };
  return (
    <>
    <ToastContainer/>
    <Container>
    <FormWrapper>
      <Title>Enter the Email</Title>
      <form onSubmit={handleSubmit}>
       
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
       
        <Button type="submit">submit</Button>
      </form>
     
    </FormWrapper>
  </Container>
  </>
  )
}

export default ForgetPassword
