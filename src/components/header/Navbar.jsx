import { AppBar, Toolbar, Button, Typography, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useAuth } from "../provider/useAuth";



const Navbar = () => {
  const Grow = styled("div")({
    flexGrow: 1,
  });
  const [benutzer, setBenutzer] = useState("");
  const [passwort, setPasswort] = useState("");
  const navigate = useNavigate();
  const {login, rolle} = useAuth();
  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };
  const handleLoginClick =  () => {
    login(benutzer, passwort);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Button onClick={handleLogoClick} color="inherit">
          AutoLogo
        </Button>
        <Button onClick={handleSearchClick} variant="contained" color="primary">
          Erweiterte Suche <SearchIcon />
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
        <Button onClick={handleLoginClick} color="inherit">
          {rolle}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
