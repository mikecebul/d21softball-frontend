import { makeStyles } from "@material-ui/core";
import React from "react";
import Navbar from "./Navbar";
import StickyFooter from "./StickyFooter";
import NavBreadcrumbs from "./NavBreadcrumbs";

const useStyles = makeStyles({
  page: {
    background: "#f9f9f9",
    width: "100%",
    flex: 1,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
});

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      {/* Deactivated BreadCrumbs */}
      {/* <NavBreadcrumbs /> */}
      <div className={classes.page}>{children}</div>
      <StickyFooter />
    </div>
  );
}
