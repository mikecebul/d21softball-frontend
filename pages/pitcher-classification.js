import React, { useState } from "react";
import { API_URL, fromImageToUrl } from "../utils/urls";
import Markdown from "markdown-to-jsx";
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
  outterBox: {
    margin: theme.spacing(4, 0, 8, 0),
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
  linkButton: {
    margin: theme.spacing(4, 0, 0, 0),
    // [theme.breakpoints.down("md")]: {
    //   alignSelf: "center",
    // },
  },
  url: {
    textDecoration: "none",
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
}));

export default function PitcherClassification({ pitchers, sponsors }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const align = matches ? "left" : "center";

  // console.log("Pitchers :", pitchers.link);
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
            Pitcher Classification
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            View a link to the pitcher classification list and the committee
            members
          </Typography>
        </div>
        {/* End Hero Unit */}
        <Container maxWidth="md">
          {/* Link to Pitcher Classification List */}
          <Box className={classes.outterBox}>
            <Paper className={classes.paper} elevation={3}>
              <Box className={classes.box}>
                {pitchers && (
                  <>
                    {pitchers.link.title && (
                      <Typography variant="h6" align={align}>
                        {pitchers.link.title}
                      </Typography>
                    )}
                    {pitchers.link.content && (
                      <Typography>
                        <Markdown className={classes.content} align={align}>
                          {pitchers.link.content}
                        </Markdown>
                      </Typography>
                    )}
                    {pitchers.link.media && (
                      <Button
                        className={classes.linkButton}
                        size="small"
                        endIcon={<ArrowRightIcon />}
                        color="primary"
                        variant="contained"
                        component={Link}
                        href={fromImageToUrl(pitchers.link.media)}
                      >
                        Check it out
                      </Button>
                    )}
                    {pitchers.link.url && (
                      <a
                        href={pitchers.link.url}
                        target="_blank"
                        className={classes.url}
                      >
                        <Button
                          className={classes.linkButton}
                          size="small"
                          endIcon={<ArrowRightIcon />}
                          color="primary"
                          variant="contained"
                        >
                          Check it out
                        </Button>
                      </a>
                    )}
                  </>
                )}
              </Box>
            </Paper>
            <Sponsors sponsors={sponsors} />
          </Box>
        </Container>
      </main>
    </React.Fragment>
  );
}
export async function getStaticProps() {
  const pitchers_res = await fetch(`${API_URL}/pitcher-classification/`);
  const pitchers = await pitchers_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      pitchers,
      sponsors,
    },
  };
}
