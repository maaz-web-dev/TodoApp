import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import { useFacebookLogin } from 'react-facebook-login-hook';
import { useNavigate } from 'react-router-dom';
import {useAuth } from '../Utils/AuthContext'
import Navbar from '../component/Navbar';
import Link from  "@mui/material/Link"
import { Link as RouterLink } from 'react-router-dom'; 

const SignInPage = () => {
  const { Login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const handleSignIn = async () => {
  //   if (!email || !password) {
  //     setError('Please enter both email and password.');
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch('http://localhost:3001/todos/signin', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username: email, password }),
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setError(errorData.error || 'Failed to sign in.');
  //       return;
  //     }
  
  //     const data = await response.json();
  //     // Assuming your server sends a token upon successful sign-in
  //     const token = data.token;
  
  //     // Handle successful sign-in (e.g., save the token to local storage)
  //     // ...
  
  //     // Clear any previous error
  //     setError('');
  //   } catch (error) {
  //     console.error('Error during sign-in:', error);
  //     setError('Failed to sign in. Please try again.');
  //   }
  // };
  const handleSignIn = async () => {
    console.log("hand le singinn ");
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3001/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
  
      if (!response.ok) {
        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('application/json')) {
          // Parse and display the error message
          const errorData = await response.json();
          setError(errorData.error || 'Failed to sign in.');
        } else {
          // If the response is not JSON, display a generic error
          setError('Failed to sign in. Please try again.');
        }
        return;
      }
  
      const data = await response.json();
      // Assuming your server sends a token upon successful sign-in
      const token = data.token;
  
      // Handle successful sign-in (e.g., save the token to local storage)
      // ...
  
      // Clear any previous error
      Login();
      navigate('/')
      setError('');
      
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError('Failed to sign in. Please try again.');
    }
  };

  const { login, isLoggingIn } = useFacebookLogin({
    appId: 'your-facebook-app-id',
    onSuccess: (response) => {
      console.log('Logging in with Facebook:', response);
    },
    onError: (error) => {
      console.error('Facebook login error:', error);
    },
  });

  return (
    <>
    <Navbar />
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Sign In
        </Typography>
        <TextField
          label="Email Address"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          Don't have an account? <Link component={RouterLink} to="/signup">Sign up</Link> 
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: '#1877f2',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={login}
          disabled={isLoggingIn}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H12V14H9V11H12V8C12 5.79086 13.7909 4 16 4H19V7H17C15.8954 7 15 7.89543 15 9V11H18L17.5 14H15V22H19C20.1046 22 21 21.1046 21 20V4C21 2.89543 20.1046 2 19 2Z"
              fill="white"
            />
            <path
              d="M17.5 14H15V22H17.5C18.8807 22 20 20.8807 20 19.5C20 18.1193 18.8807 17 17.5 17H17V14Z"
              fill="#1877f2"
            />
            <path
              d="M16.1875 14.5V17H14.6875L14.25 19H16.1875L16.875 14.5H14.9375V14H16.1875V14.5Z"
              fill="white"
            />
          </svg>
          Login with Facebook
        </Button>
      </Paper>
    </Container>
    </>
  );
  
};

export default SignInPage;
