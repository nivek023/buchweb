import { AppBar, Toolbar, Button, Typography, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import BookIcon from '@mui/icons-material/Book'
import { useState, useEffect } from 'react'
import { useAuth } from '../provider/useAuth'
import Box from '@mui/material/Box';

const Navbar = () => {
  const Grow = styled('div')({
    flexGrow: 1,
  })

  const [benutzer, setBenutzer] = useState('')
  const [passwort, setPasswort] = useState('')
  const navigate = useNavigate()
  const { login, logout } = useAuth()
  const [navbarColor, setNavbarColor] = useState('default')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleSearchClick = () => {
    navigate('/search')
  }

  const handleAddClick = () => {
    navigate('/add')
  }
  const handleLoginClick = async () => {
    if (isLoggedIn) {
      logout()
      setIsLoggedIn(false)
      console.log('Navbar.handleLoginClick: logged out')
      return
    }
    try {
      const successfulLogin = await login(benutzer, passwort)
      setIsLoggedIn(successfulLogin)

      console.log(
        'Navbar.handleLoginClick: login executed, successfulLogin: ',
        successfulLogin
      )

      if (successfulLogin) {
        console.log('Login success')
        setNavbarColor('success')
      } else {
        console.log('Login failed')
        setNavbarColor('error')
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }
  useEffect(() => {
    if (navbarColor === 'error') {
      const timeout = setTimeout(() => {
        setNavbarColor('default')
      }, 260)
      return () => clearTimeout(timeout)
    }
    if (navbarColor === 'success') {
      const timeout = setTimeout(() => {
        setNavbarColor('default')
      }, 260)
      return () => clearTimeout(timeout)
    }
  }, [navbarColor])

  return (
    <AppBar position="fixed" color={navbarColor}>
      <Toolbar>
        <Button onClick={handleLogoClick} color="inherit">
          <BookIcon />
        </Button>
        <Box sx={{ marginRight: 3 }} />
        <Button onClick={handleSearchClick} variant="contained" color="primary">
          Erweiterte Suche <SearchIcon />
        </Button>
        <Box sx={{ marginRight: 1 }} />
        <Button onClick={handleAddClick} variant="contained" color="primary">
          Neues Buch <AddIcon />
        </Button>
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
                onChange={(e) => setPasswort(e.target.value)}
              />
            </Typography>
          </>
        )}
        <Box sx={{ marginRight: 1 }} />
        <Button onClick={handleLoginClick} variant="contained" color="primary">
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}
export default Navbar
