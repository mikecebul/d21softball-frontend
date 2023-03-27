import React from "react";
import { useCurrentUser } from "../context/CurrentUser";
import Image from "next/image";
import USAWideLogo from "../public/USA_MI_Logo_Header.png";

import NavDrawer from "./NavDrawer";
import NavDesktop from "./NavDesktop";
import AccountMenu from "./AccountMenu";

import { makeStyles } from "@material-ui/core/styles";
import Link from "../src/Link";
import {
  AppBar,
  Button,
  Container,
  List,
  ListItem,
  Toolbar,
  Typography,
  Slide,
  useScrollTrigger,
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
    flex: "1",
  },
  toolbar: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(2),
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  contactLinksMenu: {
    display: "flex",
    padding: 0,
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(4),
    },

    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
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
  contactLinksText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const user = useCurrentUser();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const roomForLogo = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div>
      <AppBar position="fixed">
        <Container>
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
              <Link href="/login">
                <Button
                  variant="contained"
                  color="default"
                  aria-label="Login"
                  size="small"
                >
                  Login
                </Button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <ScrollToHide>
        <AppBar position="relative">
          <Container>
            <Toolbar className={classes.toolbar}>
              {roomForLogo && (
                <Image
                  src={USAWideLogo}
                  href="https://www.usasoftballmi.org/"
                  target="_blank"
                  alt="Link to USA Softball of Michigan"
                  height={40}
                  width={181}
                ></Image>
              )}
              <List dense className={classes.contactLinksMenu}>
                <Link href="mailto:scott@masad21.org" color="inherit">
                  <ListItem button className={classes.button}>
                    <ListItemIcon className={classes.icon}>
                      <EmailOutlinedIcon className={classes.icon} />
                    </ListItemIcon>
                    <Typography className={classes.contactLinksText}>
                      scott@d21softball.org
                    </Typography>
                  </ListItem>
                </Link>
                <Link href="tel:123-547-1144" color="inherit">
                  <ListItem button className={classes.button}>
                    <ListItemIcon className={classes.icon}>
                      <PhoneOutlinedIcon className={classes.icon} />
                    </ListItemIcon>
                    <Typography
                      variant="body1"
                      className={classes.contactLinksText}
                    >
                      (231) 547-1144
                    </Typography>
                  </ListItem>
                </Link>
              </List>
            </Toolbar>
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
                <Link href="/login">
                  <Button
                    variant="contained"
                    color="default"
                    aria-label="Login"
                    size="small"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </ScrollToHide>
    </div>
  );
}

const ScrollToHide = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: props.threshold,
    target: props.window ? window() : undefined,
  });

  return (
    <Slide appear={true} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
};
