import React, { useState } from "react";
import { API_URL, fromImageToUrl } from "../utils/urls";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "../src/Link";
import Sponsors from "../components/sponsors";

import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardActionArea-root": {
      textAlign: "center",
    },
    // margin: theme.spacing(0, 4, 0, 8),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
  },
  content: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  logo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("xs")]: {
      paddingLeft: theme.spacing(35),
      paddingRight: theme.spacing(35),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  outterBox: {
    margin: theme.spacing(0, 0, 4, 0),
  },
  paper: {
    margin: theme.spacing(0, 0, 4, 0),
    padding: theme.spacing(4, 8, 4, 8),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 0, 2, 0),
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    padding: theme.spacing(4, 8, 4, 8),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 0, 2, 0),
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  box: {
    flexDirection: "column",
    margin: theme.spacing(2, 0, 4, 0),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
  updateButton: {
    margin: theme.spacing(4, 0, 0, 0),
    // [theme.breakpoints.down("md")]: {
    //   alignSelf: "center",
    // },
  },
  link: {
    textDecoration: "none",
  },
}));

export default function Motel({ leagues, sponsors }) {
  const classes = useStyles();

  const info = leagues.league;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  console.log("Leagues:", leagues);
  return (
    <React.Fragment>
      <main className={classes.root}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Local Softball Leagues
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            League information for District 21
          </Typography>
        </div>
        {/* End Hero Unit */}
        <Container className={classes.content} maxWidth="md">
          <Box display="flex" flexDirection="column" justifyContent="center">
            {info ? (
              <>
                <Box className={classes.outterBox}>
                  <Paper className={classes.paper} elevation={3}>
                    {info.map((league) => (
                      <React.Fragment key={league.id}>
                        <Box>
                          {league.league_name && (
                            <Typography variant="h4" align="center">
                              {league.league_name}
                            </Typography>
                          )}

                          {league.location && (
                            <Typography variant="h5" align="center">
                              {league.location}
                            </Typography>
                          )}
                          {league.contact_name && (
                            <Typography variant="body1" align="center">
                              {league.contact_name}
                            </Typography>
                          )}
                          {league.contact_position && (
                            <Typography variant="body2" align="center">
                              {league.contact_position}
                            </Typography>
                          )}

                          {league.contact_phone && (
                            <Link
                              href={`tel:${league.contact_phone}`}
                              color="default"
                            >
                              <Typography variant="body2" align="center">
                                {league.contact_phone}
                              </Typography>
                            </Link>
                          )}
                          {league.contact_email && (
                            <Link
                              href={`mailto:${league.contact_email}`}
                              color="default"
                            >
                              <Typography variant="body2" align="center">
                                {league.contact_email}
                              </Typography>
                            </Link>
                          )}
                          <Box className={classes.box}>
                            {league.link.map((link) => (
                              <>
                                {link.media && (
                                  <Button
                                    className={classes.updateButton}
                                    size="small"
                                    endIcon={<ArrowRightIcon />}
                                    color="primary"
                                    variant="contained"
                                    component={Link}
                                    href={API_URL + link.media.url}
                                  >
                                    {link.title}
                                  </Button>
                                )}
                                {link.link && (
                                  <a
                                    href={link.link}
                                    target="_blank"
                                    className={classes.link}
                                  >
                                    <Button
                                      className={classes.updateButton}
                                      size="small"
                                      endIcon={<ArrowRightIcon />}
                                      color="primary"
                                      variant="contained"
                                    >
                                      {link.title}
                                    </Button>
                                  </a>
                                )}
                                <Box p={2} />
                              </>
                            ))}
                          </Box>
                          <Box p={1} />
                          <Divider />
                          <Box p={1} />
                        </Box>
                      </React.Fragment>
                    ))}
                    {/* <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      className={classes.logo}
                    >
                      <a target="_blank" href={info.url}>
                        <Image
                          src={fromImageToUrl(info.media)}
                          alt="Link to local Motels"
                          height={info.media.height}
                          width={info.media.width}
                        ></Image>
                        <Typography variant="caption">
                          Petoskey Area Hotel Listings
                        </Typography>
                      </a>
                    </Box> */}
                  </Paper>
                </Box>
              </>
            ) : (
              <Box>
                <Typography>
                  Currently no league information right now.
                </Typography>
              </Box>
            )}
          </Box>
          <Sponsors sponsors={sponsors} />
        </Container>
      </main>
    </React.Fragment>
  );
}
export async function getStaticProps() {
  const leagues_res = await fetch(`${API_URL}/leagues/`);
  const leagues = await leagues_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      leagues,
      sponsors,
    },
  };
}
