import React, { useState } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import { API_URL } from "../utils/urls";

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
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import SportsHandballOutlinedIcon from "@material-ui/icons/SportsHandballOutlined";
import Link from "../src/Link";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SportsIcon from "@material-ui/icons/Sports";
import { Divider, ListSubheader } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  subMenuButton: {
    paddingLeft: theme.spacing(4),
  },
}));

const NavDrawer = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const dispatch = useDispatchCurrentUser();
  const user = useCurrentUser();

  // Nested List ----------------------
  // const [openList, setOpenList] = useState(false);

  // const handleClick = () => {
  //   setOpenList(!openList);
  // };

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
          {/* Header */}
          <ListSubheader
            component="h2"
            align="center"
            id="nested-list-subheader"
          >
            District 21 Softball
          </ListSubheader>
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
          {/* Pitchers */}
          <Link href="/pitcher-classification" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <SportsHandballOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Pitchers" />
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
          {/* Hall of Fame */}
          <Link href="/hall-of-fame" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <EmojiEventsIcon />
              </ListItemIcon>
              <ListItemText primary="Hall of Fame" />
            </ListItem>
          </Link>
          {/* Motel */}
          <Link href="/motel" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <HotelOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Motels" />
            </ListItem>
          </Link>
          {/* Leagues */}
          <Link href="/local-leagues" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Leagues" />
            </ListItem>
          </Link>
          {/* Umpires */}
          <Link href="/umpire" color="inherit">
            <ListItem button onClick={() => setOpen(false)}>
              <ListItemIcon>
                <SportsIcon />
              </ListItemIcon>
              <ListItemText primary="Umpires" />
            </ListItem>
          </Link>
          {/* Nested List Item */}
          {/* <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="More Info" />
            {openList ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openList} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/info" color="inherit">
                <ListItem button className={classes.subMenuButton}>
                  <ListItemIcon>
                    <HotelOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Motel" />
                </ListItem>
              </Link>
            </List>
          </Collapse> */}
          <Divider />
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
