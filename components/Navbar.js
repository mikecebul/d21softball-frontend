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
import NavDrawer from "./NavDrawer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 240,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  // Fix this on click event
  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };

  return (
    <div>
      <NavDrawer toggleDrawer={toggleDrawer} />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
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
