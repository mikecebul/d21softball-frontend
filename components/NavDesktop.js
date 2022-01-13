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
  navbar: {
    flexDirection: "column",
  },
  navItem: {
    flexDirection: "row",
  },
}));

export default function NavDesktop() {
  const classes = useStyles();
  const user = useCurrentUser();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box display="flex" flexGrow={1} alignItems="center">
      <List>
        <Link href="/" color="inherit">
          <ListItem button>
            <ListItemText className={classes.logo} primary="D21 Softball" />
          </ListItem>
        </Link>
      </List>
      <List>
        <ListItem>
          <ListItemText />
        </ListItem>
      </List>
      <List>
        <Link href="/tournaments" color="inherit">
          <ListItem button>
            <ListItemText primary="Tournaments" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link href="/camps" color="inherit">
          <ListItem button>
            <ListItemText primary="Development Workshops" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link href="/archives" color="inherit">
          <ListItem button>
            <ListItemText primary="Archives" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link href="/hall-of-fame" color="inherit">
          <ListItem button>
            <ListItemText primary="Hall of Fame" />
          </ListItem>
        </Link>
      </List>
      <List>
        <Link href="/info" color="inherit">
          <ListItem button>
            <ListItemText primary="Info" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}
