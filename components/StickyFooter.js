import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "../src/Link";
import Copyright from "../src/Copyright";

const useStyles = makeStyles((theme) => ({
  footer: {
    flexShrink: 0,
    padding: theme.spacing(3, 2),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="center"></Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
