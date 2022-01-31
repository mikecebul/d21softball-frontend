import React from "react";
import { useCurrentUser } from "../context/CurrentUser";
import { useRouter } from "next/router";
import Image from "next/image";
import USAWideLogo from "../public/USA-Michigan-Secondary---Blue_small.png";

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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";

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
  navItems: {
    flexDirection: "row",
    justifyContent: "start",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1.5),
      paddingLeft: theme.spacing(1),
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  horizMenu: {
    display: "flex",
    paddingBottom: 0,
  },
  icon: {
    minWidth: "3rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      minWidth: "24px",
    },
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(0),
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
      paddingRight: theme.spacing(1),
    },
  },
}));

export default function Navbar() {
  const router = useRouter();
  const classes = useStyles();
  const user = useCurrentUser();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const tinyMobile = useMediaQuery("(min-width:360px)");
  const roomForLogo = useMediaQuery("(min-width:750px)");

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
          <Box display="flex" className={classes.navbar}>
            <Box display="flex" className={classes.navItems}>
              {roomForLogo && (
                <a target="_blank" href="https://www.usasoftballmi.org/">
                  <Image
                    src={USAWideLogo}
                    alt="Link to USA Softball of Michigan"
                    height={78}
                    width={240}
                  ></Image>
                </a>
              )}
              <List dense className={classes.horizMenu}>
                <Link href="mailto:scott@masad21.org" color="inherit">
                  <ListItem button className={classes.button}>
                    <ListItemIcon className={classes.icon}>
                      <EmailOutlinedIcon className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary="scott@d21softball.org" />
                  </ListItem>
                </Link>
                <Link href="tel:123-547-1144" color="inherit">
                  <ListItem button className={classes.button}>
                    <ListItemIcon className={classes.icon}>
                      <PhoneOutlinedIcon className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText primary="(231) 547-1144" />
                  </ListItem>
                </Link>
              </List>
            </Box>
            <Toolbar>
              {matches ? (
                <NavDesktop />
              ) : (
                <>
                  <NavDrawer />
                  <Typography variant="h6" className={classes.title}>
                    D21 Softball
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
                  size="small"
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
          </Box>
        </Container>
      </AppBar>
    </div>
  );
}
