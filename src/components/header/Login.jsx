import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

import { useAuth } from '../provider/useAuth.js';

const Login = () => {
  const { logout, isLoggedIn, navbarColor } = useAuth();
  const [benutzer, setBenutzer] = useState('');
  const [passwort, setPasswort] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:800px)');

  const handleLoginClick = async () => {
      try {
        if (isLoggedIn) {
          handleLogout();
          return;
        }
        const successfulLogin = await login(benutzer, passwort);
        setIsLoggedIn(successfulLogin);
        if (successfulLogin) {
          setNavbarColor('success');
        } else {
          setNavbarColor('error');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  useEffect(() => {
    if (navbarColor === 'success') {
      const timeout = setTimeout(() => {
      }, 260);
      return () => clearTimeout(timeout);
    }
  }, [navbarColor]);

  useEffect(() => {
    if (!isMobile && location.pathname === '/login') {
      navigate('/');
    }
  }, [isMobile, location, navigate]);

  return (
    <div style={{ padding: '20px' }}>
      {isMobile && (
        <>
          <TextField
            id="login-benutzer-mobile"
            label="Benutzer"
            variant="outlined"
            color="secondary"
            value={benutzer}
            onChange={(e) => setBenutzer(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            id="login-passwort-mobile"
            label="Passwort"
            variant="outlined"
            color="secondary"
            type="password"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            fullWidth
            margin="normal"
          />
        </>
      )}
      {!isMobile && (
        <>
          <TextField
            id="login-benutzer"
            label="Benutzer"
            variant="outlined"
            color="secondary"
            value={benutzer}
            onChange={(e) => setBenutzer(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            id="login-passwort"
            label="Passwort"
            variant="outlined"
            color="secondary"
            type="password"
            value={passwort}
            onChange={(e) => setPasswort(e.target.value)}
            fullWidth
            margin="normal"
          />
        </>
      )}
      <Button
        onClick={handleLoginClick}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        style={{ marginTop: '20px' }}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </Button>
    </div>
  );

export default Login;
