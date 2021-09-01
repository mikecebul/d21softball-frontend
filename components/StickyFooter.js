import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";

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
    <footer className={classes.footer}>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Box borderBottom={1}>
              <Typography variant="h6">
                District Commissioner - Scott Kelly
              </Typography>
            </Box>
            <List dense>
              <Link href="mailto:scott@masad21.org" color="inherit">
                <ListItem button>
                  <ListItemIcon>
                    <EmailOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="scott@masad21.org" />
                </ListItem>
              </Link>
              <Link href="tel:123-547-1144" color="inherit">
                <ListItem button>
                  <ListItemIcon>
                    <PhoneOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="231-547-1144" />
                </ListItem>
              </Link>
              <Link
                href="https://goo.gl/maps/PSj6Do1ttGzjpCkj9"
                color="inherit"
              >
                <ListItem button>
                  <ListItemIcon>
                    <LocationOnOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="208 W. Lincoln, Charlevoix, MI 49720" />
                </ListItem>
              </Link>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box borderBottom={1}>
              <Typography variant="h6">Links</Typography>
            </Box>
            <List dense>
              <Link
                href="https://www.usasoftballmi.org/"
                rel="noopener"
                target="_blank"
                color="inherit"
              >
                <ListItem button>
                  <ListItemText primary="MASA Home" />
                </ListItem>
              </Link>
              <Link
                href="https://basesrecoverycenter.org/wp/"
                rel="noopener"
                target="_blank"
                color="inherit"
              >
                <ListItem button>
                  <ListItemText primary="BASES Home" />
                </ListItem>
              </Link>
            </List>
          </Grid>
        </Grid>
        <Typography variant="body1" align="center"></Typography>
        <Copyright />
      </Container>
    </footer>
  );
}
