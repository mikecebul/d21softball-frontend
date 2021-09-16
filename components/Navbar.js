import React from "react";
import { useCurrentUser } from "../context/CurrentUser";
import { useRouter } from "next/router";
import NavDrawer from "./NavDrawer";
import NavDesktop from "./NavDesktop";
import AccountMenu from "./AccountMenu";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Link from "../src/Link";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    "& span, & svg": {
      fontSize: "2rem",
    },
  },
}));

export default function Navbar() {
  const router = useRouter();
  const classes = useStyles();
  const user = useCurrentUser();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const handleLoginClick = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            {matches ? (
              <NavDesktop />
            ) : (
              <>
                <NavDrawer />
                <Typography variant="h6" className={classes.title}>
                  MASA D21
                </Typography>
              </>
            )}
            {user.isAuthenticated ? (
              // Simple Menu
              <AccountMenu />
            ) : (
              <ButtonGroup
                // variant="contained"
                // color="primary"
                aria-label="verification button group"
              >
                <Button
                  onClick={handleLoginClick}
                  variant="contained"
                  color="primary"
                  aria-label="Login Button"
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignupClick}
                  variant="contained"
                  color="default"
                  aria-label="Sign Up Button"
                >
                  SIGN UP
                </Button>
              </ButtonGroup>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
