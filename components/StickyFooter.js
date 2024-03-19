import React from "react";
import Link from "../src/Link";
import Image from "next/image";
import { API_URL } from "../utils/urls";
import Copyright from "../src/Copyright";
import USATallLogo from "../public/USA_Michigan_Primary_-_Blue_small.jpg";
import USAWideLogo from "../public/USA-Michigan-Secondary---Blue_small.png";

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
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  foot: {
    flexShrink: 0,
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.grey[200],
  },
}));

const StickyFooter = () => {
  const classes = useStyles();
  const theme = useTheme();
  const roomForLogo = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <footer className={classes.foot}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center">
              {!roomForLogo ? (
                <a target="_blank" href="https://www.usasoftballmi.org/">
                  <Image
                    src={USAWideLogo}
                    alt="Link to USA Softball of Michigan"
                    height={78}
                    width={240}
                  ></Image>
                </a>
              ) : (
                <a target="_blank" href="https://www.usasoftballmi.org/">
                  <Image
                    src={USATallLogo}
                    alt="Link to USA Softball of Michigan"
                    height={240}
                    width={195}
                  ></Image>
                </a>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
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
                  <ListItemText primary="101 M-66 N, Charlevoix, MI 49720" />
                </ListItem>
              </Link>
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
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
                <ListItem button>
                  <ListItemIcon>
                    <LanguageOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="USA Softball MI" />
                </ListItem>
              </Link>
              <Link
                href="https://basesrecoverycenter.org/wp/"
                rel="noopener"
                target="_blank"
                color="inherit"
              >
                <ListItem button>
                  <ListItemIcon>
                    <LanguageOutlinedIcon />
                  </ListItemIcon>
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
