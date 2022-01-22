import React from "react";
import Head from "next/head";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Sponsors from "../components/sponsors";

import Markdown from "markdown-to-jsx";
import moment from "moment";
import { API_URL } from "../utils/urls";
import Image from "next/image";
import logo from "../public/logo.svg";
import { Typography, Card, Paper, Divider } from "@material-ui/core";
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
}));

const Index = ({ messages, sponsors }) => {
  const classes = useStyles();

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
        {messages && (
          <Box className={classes.outterBox}>
            <Paper className={classes.paper} elevation={3}>
              <Box className={classes.box}>
                <Typography variant="h4" className={classes.date}>
                  <Markdown>
                    {moment(messages[0].updated_at).format("LL")}
                  </Markdown>
                </Typography>
                <Markdown>{messages[0].message}</Markdown>
                <Typography variant="h4" className={classes.author}>
                  Scott Kelly
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
        <Box className={classes.outterBox}>
          <Paper className={classes.paper} elevation={3}>
            <Box className={classes.box}>
              <Typography align="center">
                <Markdown>{messages[0].info}</Markdown>
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Box className={classes.outterBox}>
          <Sponsors sponsors={sponsors} />
        </Box>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const message_res = await fetch(`${API_URL}/messages/`);
  const messages = await message_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      messages,
      sponsors,
    },
  };
}

export default Index;
