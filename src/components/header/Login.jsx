import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth } from '../provider/useAuth';

const Login = () => {
  const { login, logout } = useAuth();
  const [benutzer, setBenutzer] = useState('');
  const [passwort, setPasswort] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = async () => {
    try {
      if (isLoggedIn) {
        logout();
        setIsLoggedIn(false);
      } else {
        const successfulLogin = await login(benutzer, passwort);
        if (successfulLogin) {
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error('Error during login/logout:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
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
};

export default Login;
