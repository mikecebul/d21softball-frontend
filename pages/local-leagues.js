import React from "react";
import Head from "next/head";
import { API_URL } from "../utils/urls";
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
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 2, 2, 2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(6, 2, 2, 2),
    },
  },
  content: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(5),
    },
  },
  paper: {
    padding: theme.spacing(4, 8, 4, 8),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 2, 2, 2),
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  box: {
    flexDirection: "column",
    margin: theme.spacing(4, 0, 0, 0),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  divider: {
    marginBottom: theme.spacing(4),
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
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const align = matches ? "left" : "center";

  // console.log("Leagues:", leagues);
  return (
    <React.Fragment>
      <Head>
        <title>Local Leagues</title>
        <meta
          name="description"
          content="Local softball leagues in distrct 21 of Northern Michigan."
        />
      </Head>
      <main className={classes.root}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Typography
            component="h1"
            variant={mobile ? "h4" : "h2"}
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Local Softball Leagues
          </Typography>
          <Typography
            variant={mobile ? "body1" : "h5"}
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
                <Box>
                  <Paper className={classes.paper} elevation={3}>
                    {info.map((league) => (
                      <React.Fragment key={league.id}>
                        <Box>
                          {league.league_name && (
                            <Typography variant="h4" align={align}>
                              {league.league_name}
                            </Typography>
                          )}

                          {league.location && (
                            <Typography variant="h5" align={align}>
                              {league.location}
                            </Typography>
                          )}
                          <Box p={1} />
                          {league.contact_name && (
                            <Typography variant="body1" align={align}>
                              {league.contact_name}
                            </Typography>
                          )}
                          {league.contact_position && (
                            <Typography variant="body2" align={align}>
                              {league.contact_position}
                            </Typography>
                          )}

                          {league.contact_phone && (
                            <Link
                              href={`tel:${league.contact_phone}`}
                              // color="default"
                            >
                              <Typography variant="body2" align={align}>
                                {league.contact_phone}
                              </Typography>
                            </Link>
                          )}
                          {league.contact_email && (
                            <Link
                              href={`mailto:${league.contact_email}`}
                              // color="default"
                            >
                              <Typography variant="body2" align={align}>
                                {league.contact_email}
                              </Typography>
                            </Link>
                          )}
                          <Box className={classes.box}>
                            {league.link.map((link) => (
                              <div key={link.id}>
                                {link.media && (
                                  <Button
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
                              </div>
                            ))}
                          </Box>
                          <Box p={1} />
                          <Divider />
                          <Box p={1} />
                        </Box>
                      </React.Fragment>
                    ))}
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
