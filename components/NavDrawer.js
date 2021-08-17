import { React, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

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
import Link from "../src/Link";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const NavDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);

    // Logout User ----------------------
    const logoutUser = async () => {
      axios
        .post(`${API_URL}/logout`, {
          withCredentials: true,
        })
        .then((response) => {
          // Handle success.
          console.log("Data: ", response.data);
          setUser(null);
          router.push("/");
          console.log(user);
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
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List>
          {/* Home */}
          <Link href="/">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          {/* Tournaments */}
          <Link href="/tournaments">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <SportsBaseballOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Tournaments" />
            </ListItem>
          </Link>
          {/* About */}
          <Link href="/about">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <InfoOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
          {!user ? (
            <Link href="/login">
              <ListItem button onClick={() => setOpen(false)}>
                <ListItemIcon>
                  <LockOpenOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
          ) : (
            <Link href="/">
              <ListItem
                button
                onClick={() => {
                  setOpen(false);
                  logoutUser();
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
