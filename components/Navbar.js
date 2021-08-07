import { React, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
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
  const { user } = useContext(AuthContext);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <NavDrawer />
          <Typography variant="h6" className={classes.title}>
            MASA D21
          </Typography>
          {user ? (
            <Link href="/account">
              <Button aria-label="Account" variant="contained" color="default">
                Account
              </Button>
            </Link>
          ) : (
            <Link href="/signup">
              <Button
                aria-label="Sign Up Button"
                variant="contained"
                color="default"
              >
                SIGN UP
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
