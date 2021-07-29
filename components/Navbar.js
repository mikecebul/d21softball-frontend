import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "../src/Link";
import NavDrawer from "./NavDrawer";

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

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <NavDrawer />
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
