import React from "react";
import Head from "next/head";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Sponsors from "../components/sponsors";
import Link from "../src/Link";

import Markdown from "markdown-to-jsx";
import moment from "moment";
import { API_URL } from "../utils/urls";
import Image from "next/image";
import logo from "../public/logo.svg";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { Typography, Card, Paper, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 4, 8, 4),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4, 4, 4, 4),
    },
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
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  outterBox: {
    margin: theme.spacing(4, 0, 8, 0),
  },
  date: {
    paddingBottom: theme.spacing(3),
  },
  author: {
    paddingTop: theme.spacing(3),
  },
  updateButton: {
    margin: theme.spacing(4, 0, 2, 0),
  },
  link: {
    textDecoration: "none",
  },
}));

const Index = ({ frontPage, sponsors }) => {
  const classes = useStyles();
  console.log("Front Page:", API_URL + frontPage.updates[1].media.url);
  return (
    <>
      <Head>
        <title>D21 Softball Home Page</title>
        <meta
          name="description"
          content="Men's fastpitch softball in distrct 21 of Northern Michigan."
        />
      </Head>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Box display="flex" justifyContent="center">
            <Image src={logo} alt="Site Logo" />
          </Box>
        </Container>
      </div>
      {/* End hero unit */}
      <Container maxWidth="md">
        {frontPage.news && (
          <Box className={classes.outterBox}>
            <Paper className={classes.paper} elevation={3}>
              <Box className={classes.box}>
                <Typography variant="h4" className={classes.date}>
                  <Markdown>
                    {moment(frontPage.news.date).format("LL")}
                  </Markdown>
                </Typography>
                <Markdown>{frontPage.news.content}</Markdown>
                <Typography variant="h6" className={classes.author}>
                  {frontPage.news.from}
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
        {frontPage.updates && (
          <Box className={classes.outterBox}>
            <Paper className={classes.paper} elevation={3}>
              {frontPage.updates.map((update) => (
                <Box className={classes.box} key={update.id} mb={4}>
                  {update.title && (
                    <Typography variant="h6">{update.title}</Typography>
                  )}
                  {update.content && <Markdown>{update.content}</Markdown>}
                  {update.media && (
                    <Button
                      className={classes.updateButton}
                      size="small"
                      endIcon={<ArrowRightIcon />}
                      color="primary"
                      variant="contained"
                      component={Link}
                      href={API_URL + update.media.url}
                    >
                      Check it out
                    </Button>
                  )}
                  {update.link && (
                    <a
                      href={update.link}
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
                        Check it out
                      </Button>
                    </a>
                  )}
                  <Divider />
                </Box>
              ))}
            </Paper>
          </Box>
        )}
        <Box className={classes.outterBox}>
          <Sponsors sponsors={sponsors} />
        </Box>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const frontPage_res = await fetch(`${API_URL}/front-page/`);
  const frontPage = await frontPage_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      frontPage,
      sponsors,
    },
  };
}

export default Index;
