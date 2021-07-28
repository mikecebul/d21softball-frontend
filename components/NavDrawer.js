import React from "react";
import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import SportsBaseballIcon from "@material-ui/icons/SportsBaseball";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const NavDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(true);

  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "Tournaments",
      icon: <SportsBaseballIcon />,
    },
    {
      text: "Login",
      icon: <LockOpenIcon />,
    },
  ];

  return (
    <>
      <Drawer onClose={() => setOpenDrawer(false)} open={openDrawer}>
        <List>
          {itemsList.map((item, index) => {
            const { text, icon } = item;
            return (
              <ListItem button key={text}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default NavDrawer;
