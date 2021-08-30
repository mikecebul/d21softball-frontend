import React from "react";
import { useCurrentUser } from "../context/CurrentUser";
import NavDrawer from "./NavDrawer";
import AccountMenu from "./AccountMenu";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "../src/Link";
import { Container, Menu, MenuItem } from "@material-ui/core";

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
  const user = useCurrentUser();

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <NavDrawer />
            <Typography variant="h6" className={classes.title}>
              MASA D21
            </Typography>
            {user.isAuthenticated ? (
              // Simple Menu
              <AccountMenu />
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
        </Container>
      </AppBar>
    </div>
  );
}
