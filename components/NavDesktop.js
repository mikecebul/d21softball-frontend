import React from "react";
import { useCurrentUser } from "../context/CurrentUser";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { makeStyles } from "@material-ui/core/styles";
import Link from "../src/Link";
import {
  Box,
  ClickAwayListener,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuList,
  MenuItem,
  Paper,
  Popper,
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
    margin: 0,
  },
  navbar: {
    flexDirection: "column",
  },
  navItem: {
    flexDirection: "row",
  },
  logoButton: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

export default function NavDesktop() {
  const classes = useStyles();
  const user = useCurrentUser();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  // Drop Down Menu ---------------------------
  // const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef(null);

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // function handleListKeyDown(event) {
  //   if (event.key === "Tab") {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
  // }

  return (
    <Box display="flex" flexGrow={1} alignItems="center">
      <List disablePadding={true}>
        <Link href="/" color="inherit">
          <ListItem button className={classes.logoButton}>
            <ListItemText className={classes.logo} primary="D21 Softball" />
          </ListItem>
        </Link>
      </List>
      <List disablePadding>
        <ListItem pa>
          <ListItemText />
        </ListItem>
      </List>
      <List disablePadding>
        <Link href="/tournaments" color="inherit">
          <ListItem button>
            <ListItemText primary="Tournaments" />
          </ListItem>
        </Link>
      </List>
      <List disablePadding>
        <Link href="/pitcher-classification" color="inherit">
          <ListItem button>
            <ListItemText primary="Pitchers" />
          </ListItem>
        </Link>
      </List>
      <List disablePadding>
        <Link href="/archives" color="inherit">
          <ListItem button>
            <ListItemText primary="Archives" />
          </ListItem>
        </Link>
      </List>
      <List disablePadding>
        <Link href="/hall-of-fame" color="inherit">
          <ListItem button>
            <ListItemText primary="Hall of Fame" />
          </ListItem>
        </Link>
      </List>
      <List disablePadding>
        <Link href="/motel" color="inherit">
          <ListItem button>
            <ListItemText primary="Motels" />
          </ListItem>
        </Link>
      </List>
      <List disablePadding>
        <Link href="/local-leagues" color="inherit">
          <ListItem button>
            <ListItemText primary="Leagues" />
          </ListItem>
        </Link>
      </List>
      <List disablePadding>
        <Link href="/umpire" color="inherit">
          <ListItem button>
            <ListItemText primary="Umpires" />
          </ListItem>
        </Link>
      </List>
      {/* drop down menu */}
      {/* <List
        Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <ListItem button>
          <ListItemText primary="Info" />
          <ListItemIcon>
            <KeyboardArrowDownIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <Link href="/info" color="textPrimary">
                    <MenuItem onClick={handleClose}>Motels</MenuItem>
                  </Link>
                  <Link href="/info" color="textPrimary">
                    <MenuItem onClick={handleClose}>Umpires</MenuItem>
                  </Link>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper> */}
    </Box>
  );
}
