import React from "react";
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
  indexContent: {
    paddingTop: theme.spacing(8),
  },
  logo: {
    // marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  paper: {
    padding: theme.spacing(4, 8, 4, 8),
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  box: {
    // marginBottom: theme.spacing(5),
    // paddingLeft: theme.spacing(10),
    // paddingRight: theme.spacing(10),
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
    <Container className={classes.indexContent} maxWidth="md">
      <Box display="flex" justifyContent="center" className={classes.logo}>
        <Image src={logo} alt="Site Logo" />
      </Box>
      {messages && (
        <Box className={classes.outterBox}>
          <Paper className={classes.paper} elevation={3}>
            <Box className={classes.box}>
              <Typography variant="h4" className={classes.date}>
                <Markdown>
                  {moment(messages[0].updated_at).format("LL")}
                </Markdown>
              </Typography>
              <Markdown>{messages[0].content}</Markdown>
              <Typography variant="h6" className={classes.author}>
                Scott Kelly
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
      <Box className={classes.outterBox}>
        <Paper className={classes.paper} elevation={3}>
          <Box className={classes.box}>
            <Typography variant="h4" align="center">
              2021 Men's Fastpitch USA Softball of Michigan State Championships
            </Typography>
            <Typography align="center">August 6-8, 2021</Typography>
            <Typography align="center">
              Class A & Class B in Rockford
            </Typography>
            <Typography align="center">Class D & Class E in Holland</Typography>
          </Box>
        </Paper>
      </Box>
      <Box className={classes.outterBox}>
        <Sponsors sponsors={sponsors} />
      </Box>
    </Container>
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
