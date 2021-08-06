import React from "react";
import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SportsBaseballOutlinedIcon from "@material-ui/icons/SportsBaseballOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Link from "../src/Link";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const NavDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const itemsList = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon />,
      url: "/",
    },
    {
      text: "Tournaments",
      icon: <SportsBaseballOutlinedIcon />,
      url: "/tournaments",
    },
    {
      text: "About",
      icon: <InfoOutlinedIcon />,
      url: "/about",
    },
    {
      text: "Login",
      icon: <LockOpenOutlinedIcon />,
      url: "/login",
    },
  ];

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
          {itemsList.map((item, index) => {
            const { text, icon, url } = item;
            return (
              <Link href={url} key={text}>
                <ListItem button onClick={() => setOpen(false)}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default NavDrawer;
