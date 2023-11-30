import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Typography  from '@mui/material/Typography';
import Link from  "@mui/material/Link"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom'; 
import Navbar from '../component/Navbar';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      console.log('Full Response:', response); // Log the full response
  
      if (response.ok) {
        // Clear any previous errors
        setError('');
        const data = await response.json();
        console.log(data); // Handle the response data accordingly
      } else {
        const errorData = await response.json();
        setError(errorData.details || 'Failed to sign up. Please check your input and try again.');
      }
    } catch (error) {
      setError('Error during signup. Please try again later.');
    }
  };
  
  return (
    <>
    <Navbar />
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
          Sign Up
        </Typography>
        <form sx={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            sx={{ marginTop: 2, height: '3.5rem', borderRadius: 0, width: '100%' }}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
        Already have an account? <Link component={RouterLink} to="/signin">Sign in</Link>
      </Typography>
      </Paper>
    </Container>
    </>
  );
};

export default SignUpPage;
