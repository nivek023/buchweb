import { AppBar, Toolbar, Button, Typography, TextField, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import { useState, useEffect } from 'react';
import { useAuth } from '../provider/useAuth';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const pwdRef = useRef(null);
  const loginRef = useRef(null);
  const Grow = styled('div')({
    flexGrow: 1,
  });

  const { login, logout, role } = useAuth();
  const [benutzer, setBenutzer] = useState('');
  const [passwort, setPasswort] = useState('');
  const navigate = useNavigate();
  const [navbarColor, setNavbarColor] = useState('default');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width:800px)');

  const handleMenuClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerItemClick = (route) => {
    setIsDrawerOpen(false);
    navigate(route);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleAddClick = () => {
    navigate('/add');
  };
  const handleLoginClick = async () => {
    if (isLoggedIn) {
      logout();
      setIsLoggedIn(false);
      setPasswort('');
      navigate('/');
      console.log('Navbar.handleLoginClick: logged out');
      return;
    }
    try {
      const successfulLogin = await login(benutzer, passwort);
      setIsLoggedIn(successfulLogin);

      console.log(
        'Navbar.handleLoginClick: login executed, successfulLogin: ',
        successfulLogin
      );
      if (successfulLogin) {
        console.log('Login success');
        setNavbarColor('success');
      } else {
        console.log('Login failed');
        setNavbarColor('error');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleEnterKeyPress = (event, nextFieldRef) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nextFieldRef.current.focus();
    }
  };

  useEffect(() => {
    if (navbarColor === 'error') {
      const timeout = setTimeout(() => {
        setNavbarColor('default');
      }, 260);
      return () => clearTimeout(timeout);
    }
    if (navbarColor === 'success') {
      const timeout = setTimeout(() => {
        setNavbarColor('default');
      }, 260);
      return () => clearTimeout(timeout);
    }
  }, [navbarColor]);

  return (
    <>
      <AppBar position="fixed" color={navbarColor}>
        <Toolbar>
          {isMobile && (
            <Button onClick={handleMenuClick} color="inherit">
              <MenuIcon />
            </Button>
          )}
          <Button onClick={handleLogoClick} color="inherit">
            <BookIcon sx={{ fontSize: 45 }} />
          </Button>
          {isMobile ? null : (
            <>
              <Box sx={{ marginRight: 3 }} />
              <Button onClick={handleSearchClick} variant="contained" color="primary">
                Erweiterte Suche <SearchIcon />
              </Button>
              <Box sx={{ marginRight: 1 }} />
              <Button
                onClick={handleAddClick}
                variant="contained"
                color="primary"
                disabled={role !== 'write'}
              >
                Neues Buch <AddIcon />
              </Button>
            </>
          )}
          <Grow />
          {isLoggedIn ? null : (
            <>
              <Typography variant="h6" component="div">
                <TextField
                  id="navbar-benutzer"
                  label="Benutzer"
                  variant="outlined"
                  color="secondary"
                  value={benutzer}
                  onChange={(e) => setBenutzer(e.target.value)}
                  onKeyDown={(e) => handleEnterKeyPress(e, pwdRef)}
                />
              </Typography>
              <Typography variant="h6" component="div">
                <TextField
                  id="navbar-passwort"
                  label="Passwort"
                  variant="outlined"
                  color="secondary"
                  type="password"
                  value={passwort}
                  inputRef={pwdRef}
                  onChange={(e) => setPasswort(e.target.value)}
                  onKeyDown={(e) => handleEnterKeyPress(e, loginRef)}
                />
              </Typography>
            </>
          )}
          <Box sx={{ marginRight: 1 }} />
          <Button
            ref={loginRef}
            onClick={handleLoginClick}
            variant="contained"
            color="primary"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>

      {isMobile && (
        <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <List>
            <ListItem button onClick={() => handleDrawerItemClick('/')}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleDrawerItemClick('/search')}>
              <ListItemText primary="Erweiterte Suche" />
            </ListItem>
            <ListItem button onClick={() => handleDrawerItemClick('/add')} disabled={role !== 'write'}>
              <ListItemText primary="Neues Buch" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
