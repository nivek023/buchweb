import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAuth } from '../provider/useAuth.js';

const Login = () => {
  const { logout, login, isLoggedIn} = useAuth();
  const [benutzer, setBenutzer] = useState('');
  const [passwort, setPasswort] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:800px)');

  const handleLoginClick = async () => {
    try {
      setErrorMessage('');
      if (isLoggedIn()) {
        logout();
        return;
      }
      const successfulLogin = await login(benutzer, passwort);
      if (successfulLogin) {
        navigate('/');
      } else {
        setErrorMessage('Das Passwort oder der Benutzername ist falsch. Bitte versuche es erneut');
      }
    } catch (error) {
      console.log(error)
        setErrorMessage('Fehler bei der Anmeldung');
    }
  };

  useEffect(() => {
      const timeout = setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return () => clearTimeout(timeout);
    
  }, [errorMessage]);

  useEffect(() => {
    if (!isMobile && location.pathname === '/login') {
      navigate('/');
    }
  }, [isMobile, location, navigate]);

  return (
    <div style={{ padding: '20px' }}>
      {isMobile ? (
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
      ) : (
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
        {isLoggedIn() ? 'Logout' : 'Login'}
      </Button>
      {errorMessage && (
        <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default Login;
