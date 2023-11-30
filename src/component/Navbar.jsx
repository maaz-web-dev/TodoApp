import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Hidden from '@mui/material/Hidden';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { useAuth } from '../Utils/AuthContext';

function Navbar() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { isLoggedIn, logout } = useAuth();
  // Replace these with your actual authentication logic
  // Change to true if the user is logged in

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp={!isMobile}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.9 }}>
            News
          </Typography>
          <Hidden smDown={!isMobile}>
         { isLoggedIn && 
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Contact
            </Button>
          </>}
            {isLoggedIn ? (
              <Button color="inherit" onClick={() =>logout()}>
                Sign Out
              </Button>
            ) : (
              <>
              <Button color="inherit" component={Link} to="/SignUp">
              Sign Up
              </Button>
              <Button color="inherit" component={Link} to="/Signin">
               Sign in
              </Button>
              </>
            )}
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
