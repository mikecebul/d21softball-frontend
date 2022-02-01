import React, { useState } from "react";
import Head from "next/head";
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
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
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
    padding: theme.spacing(8, 2, 2, 2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(6, 2, 2, 2),
    },
  },
  linkContent: {
    padding: theme.spacing(6, 0, 0, 0),
    margin: theme.spacing(0, 0, 0, 0),
  },
  outterBox: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(5),
    },
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
  table: {
    minWidth: 340,
  },
  tableContaner: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

export default function PitcherClassification({ pitchers, sponsors }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const align = matches ? "left" : "center";

  // console.log("Pitchers :", pitchers);
  return (
    <React.Fragment>
      <Head>
        <title>Pitcher Clasification</title>
        <meta
          name="description"
          content="Pitcher classifications and committee members for Men's fastpitch softball in distrct 21 of Northern Michigan."
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
            Pitcher Classification
          </Typography>
          <Typography
            variant={mobile ? "body1" : "h5"}
            align="center"
            color="textSecondary"
            paragraph
          >
            Pitcher classification list and committee members
          </Typography>
        </div>
        {/* End Hero Unit */}
        <Container maxWidth="md">
          {/* Link to Pitcher Classification List */}
          <Box className={classes.outterBox}>
            {pitchers.link && (
              <>
                <Paper className={classes.paper} elevation={3}>
                  <Box className={classes.box}>
                    {pitchers.link.title && (
                      <Typography variant="h6" align={align}>
                        {pitchers.link.title}
                      </Typography>
                    )}
                    {pitchers.link.content && (
                      <Typography>
                        <Markdown className={classes.linkContent} align={align}>
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
                  </Box>
                </Paper>
              </>
            )}
            <Box p={2} />
            <Divider />
            <Box p={4} />
            {/* Table of Committee Members */}
            {pitchers.committee_members && (
              <TableContainer
                component={Paper}
                elevation={3}
                className={classes.tableContainer}
              >
                {pitchers.title ? (
                  <>
                    <Box p={(2, 6)}>
                      <Typography variant="h4" align="center">
                        {pitchers.title}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box p={(2, 4)}>
                      <Typography variant="h4" align="center">
                        Fast Pitch Classification Committee Members
                      </Typography>
                    </Box>
                  </>
                )}
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.head}>Name</TableCell>
                      <TableCell className={classes.head}>Position</TableCell>
                      <TableCell className={classes.head}>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pitchers.committee_members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.position}</TableCell>
                        <TableCell>{member.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {pitchers.appeal_process && (
              <Box p={(0, 4)}>
                <Typography variant="caption">
                  <Markdown>{pitchers.appeal_process}</Markdown>
                </Typography>
              </Box>
            )}
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
