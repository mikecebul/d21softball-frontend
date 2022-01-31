import React from "react";
import { useCurrentUser } from "../context/CurrentUser";

import { makeStyles } from "@material-ui/core/styles";
import Link from "../src/Link";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";

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
      <List disablePadding={true}>
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
        <Link href="/development-workshops" color="inherit">
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
        <Link href="/info" color="inherit">
          <ListItem button>
            <ListItemText primary="Info" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}
