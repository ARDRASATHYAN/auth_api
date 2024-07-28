import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container,FormWrapper,Title,Input,ForgotPasswordLink,LinkText,Button ,ErrorMessage} from '../styles/Formstyle';
import axios from 'axios'
import { ToastContainer, toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
    const [formData, setFormData] = useState({  email: '', password: '' });
    const [errors, setErrors] = useState({});
    // const navigate=useNavigate()
  
    const validate = () => {
      let errors = {};
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
        axios.post('http://localhost:5000/user/login', formData)
          .then(response => {
            toast.success('login succefull!', {
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
                // navigate("/")
         
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
          <Title>Log In</Title>
          <form onSubmit={handleSubmit}>
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
              <ForgotPasswordLink to="/forgetpassword">Forgot Password?</ForgotPasswordLink>
            <Button type="submit">Log In</Button>
          </form>
          <LinkText>
            Don't have an account? <Link to="/">Sign Up</Link>
          </LinkText>
        </FormWrapper>
      </Container>
      </>
  )
}

export default Login
