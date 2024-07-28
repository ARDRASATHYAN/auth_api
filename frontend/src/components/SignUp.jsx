import React, { useState } from 'react'
import { Container,Button,LinkText,FormWrapper,Title,Input,ErrorMessage } from '../styles/Formstyle';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
  
    const validate = () => {
      let errors = {};
      if (!formData.username) errors.username = 'Username is required';
      if (!formData.email) errors.email = 'Email is required';
      if (!formData.password) errors.password = 'Password is required';
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
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length === 0) {
        axios.post('http://localhost:5000/user/register', formData)
          .then(response => {
            toast.success('Registered succefull!', {
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
                window.location.reload()
          
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
      } else {
        setErrors(validationErrors);
      }
    };
  
    return (
        <>
        <ToastContainer/>
      <Container>
        <FormWrapper>
          <Title>Sign Up</Title>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <Button type="submit">Sign Up</Button>
          </form>
          <LinkText>
          Already have an account? <Link to="/login">Log In</Link>
        </LinkText>
        </FormWrapper>
      </Container>
      </>
  )
}

export default SignUp
