import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Sponsors from "../components/sponsors";

import Markdown from "markdown-to-jsx";
import moment from "moment";
import { API_URL } from "../utils/urls";
import Image from "next/image";
import logo from "../public/logo.svg";
import { Typography, Card, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  logo: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  card: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  news: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
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
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" className={classes.logo}>
        <Image src={logo} alt="Site Logo" />
      </Box>
      {messages && (
        <Card className={classes.card}>
          <Paper>
            <Box className={classes.news}>
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
        </Card>
      )}
      <Sponsors sponsors={sponsors} />
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
