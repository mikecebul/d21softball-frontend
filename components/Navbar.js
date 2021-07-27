import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "../src/Link";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link href="/">
              <MenuItem onClick={handleClose}>Home</MenuItem>
            </Link>
            <Link href="/tournaments">
              <MenuItem onClick={handleClose}>Tournaments</MenuItem>
            </Link>
            <Link href="/sign-in">
              <MenuItem onClick={handleClose}>Sign In</MenuItem>
            </Link>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            MASA D21
          </Typography>
          <Link href="/signup">
            <Button
              aria-label="Sign Up Button"
              variant="contained"
              color="inherit"
            >
              SIGN UP
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
