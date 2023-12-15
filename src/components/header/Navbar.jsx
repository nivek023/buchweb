import { AppBar, Toolbar, Button, Typography, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import BookIcon from '@mui/icons-material/Book'

const Navbar = () => {
  const Grow = styled('div')({
    flexGrow: 1,
  })
  const navigate = useNavigate()
  const handleLogoClick = () => {
    navigate('/')
  }

  const handleSearchClick = () => {
    navigate('/search')
  }

  const handleAddClick = () => {
    navigate('/add')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button onClick={handleLogoClick} color="inherit">
          <BookIcon />
        </Button>
        <Button onClick={handleSearchClick} variant="contained" color="primary">
          Erweiterte Suche <SearchIcon />
        </Button>
        <Button onClick={handleAddClick} variant="contained" color="primary">
          Neues Buch <AddIcon />
        </Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <TextField
            id="navbar-suche"
            label="Suche"
            variant="outlined"
            color="secondary"
          />
        </Typography>
        <Grow />
        <Typography variant="h6" component="div">
          <TextField
            id="navbar-benutzer"
            label="Benutzer"
            variant="outlined"
            color="secondary"
          />
        </Typography>
        <Typography variant="h6" component="div">
          <TextField
            id="navbar-passwort"
            label="Passwort"
            variant="outlined"
            color="secondary"
          />
        </Typography>
        <Button onClick={handleLoginClick} color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}
    
export default Navbar;
