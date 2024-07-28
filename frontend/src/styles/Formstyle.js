import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
`;

export const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #6e8efb;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5a76d7;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
export const LinkText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #333;

  a {
    color: #6e8efb;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s ease;

    &:hover {
      color: #5a76d7;
    }
  }
`;
export const ForgotPasswordLink = styled(Link)`
  display: block;
  margin: 10px 0;
  font-size: 14px;
  color: #6e8efb;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #5a76d7;
  }
`;