import React, { useState } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { useRouter } from "next/router";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SportsBaseballOutlinedIcon from "@material-ui/icons/SportsBaseballOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import Link from "../src/Link";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

const NavDrawer = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatchCurrentUser();
  const user = useCurrentUser();
  const router = useRouter();

  // Logout User ----------------------
  const handleLogout = async () => {
    axios
      .post(`${API_URL}/logout`, {}, { withCredentials: true })
      .then((response) => {
        // Handle success.
        console.log("Data: ", response.data);
        dispatch({ type: "LOGOUT" });
        router.push("/");
      })
      .catch((err) => {
        // Handle error.
        console.log("An error occurred:", err.response);
      });
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        <MenuIcon className={classes.menuButton} />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          {/* Home */}
          <Link href="/" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          {/* Tournaments */}
          <Link href="/tournaments" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <StarOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Tournaments" />
            </ListItem>
          </Link>
          {/* Camps */}
          <Link href="/development-workshops" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <SportsBaseballOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Development Workshops" />
            </ListItem>
          </Link>
          {/* Archives */}
          <Link href="/archives" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <HistoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Archives" />
            </ListItem>
          </Link>
          {/* Info */}
          <Link href="/info" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Info" />
            </ListItem>
          </Link>
          {!user.isAuthenticated ? (
            <Link href="/login" color="inherit">
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <LockOpenOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
          ) : (
            <Link href="/" color="inherit">
              <ListItem
                button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
              >
                <ListItemIcon>
                  <LockOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </Link>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavDrawer;
