import React from "react";
import Link from "../src/Link";
import Image from "next/image";
import { API_URL } from "../utils/urls";
import Copyright from "../src/Copyright";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  foot: {
    flexShrink: 0,
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.grey[200],
  },
  noIcon: {
    paddingLeft: theme.spacing(9),
  },
}));

const StickyFooter = () => {
  const classes = useStyles();

  return (
    <footer className={classes.foot}>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" justifyContent="center">
              <a target="_blank" href="https://www.usasoftballmi.org/</Grid>">
                <Image
                  src={`${API_URL}/uploads/USA_Softball_Logo_Tall_4dbcb2e49c.jpg`}
                  alt="Link to USA Softball of Michigan"
                  height={240}
                  width={195}
                ></Image>
                {/* <Typography variant="caption">
                Petoskey Area Hotel Listings
              </Typography> */}
              </a>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={2}>
              <Typography variant="h6">
                District Commissioner - Scott Kelly
              </Typography>
            </Box>
            <List dense>
              <Link href="mailto:scott@d21softball.org" color="inherit">
                <ListItem button>
                  <ListItemIcon>
                    <EmailOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="scott@d21softball.org" />
                </ListItem>
              </Link>
              <Link href="tel:123-547-1144" color="inherit">
                <ListItem button>
                  <ListItemIcon>
                    <PhoneOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="(231) 547-1144" />
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
          <Grid item xs={12} sm={4}>
            <Box borderBottom={2}>
              <Typography variant="h6">Links</Typography>
            </Box>
            <List dense>
              <Link
                href="https://www.facebook.com/groups/127657947314063"
                rel="noopener"
                target="_blank"
                color="inherit"
              >
                <ListItem button>
                  <ListItemIcon>
                    <FacebookIcon />
                  </ListItemIcon>
                  <ListItemText primary="D21 Softball Facebook Group" />
                </ListItem>
              </Link>
              <Link
                href="https://www.usasoftballmi.org/"
                rel="noopener"
                target="_blank"
                color="inherit"
              >
                <ListItem className={classes.noIcon} button>
                  <ListItemText primary="USA Softball MI" />
                </ListItem>
              </Link>
              <Link
                href="https://basesrecoverycenter.org/wp/"
                rel="noopener"
                target="_blank"
                color="inherit"
              >
                <ListItem className={classes.noIcon} button>
                  <ListItemText primary="BASES Recovery Center" />
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
};

export default StickyFooter;
