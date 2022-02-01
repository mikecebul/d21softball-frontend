import React from "react";
import Head from "next/head";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Sponsors from "../components/sponsors";
import FrontPageUpdates from "../components/FrontPageUpdates";
import FrontPageNews from "../components/FrontPageNews";

import { API_URL, fromImageToUrl } from "../utils/urls";
import Image from "next/image";
import logo from "../public/logo.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    // padding: theme.spacing(8, 4, 8, 4),
    // [theme.breakpoints.down("xs")]: {
    //   padding: theme.spacing(4, 4, 4, 4),
    // },
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
  // console.log("Front Page:", API_URL + frontPage.updates[1].media.url);
  // console.log("error:", frontPage.news.content);
  return (
    <>
      <Head>
        <title>D21 Softball</title>
        <meta
          name="description"
          content="Men's fastpitch softball in distrct 21 of Northern Michigan."
        />
      </Head>
      {/* Hero unit */}
      {frontPage.hero_image && (
        <div className={classes.heroContent}>
          <Box display="flex" justifyContent="center">
            <Image
              src={fromImageToUrl(frontPage.hero_image)}
              width={frontPage.hero_image.width}
              height={frontPage.hero_image.height}
              // layout="fill"
              objectFit="cover"
              alt="Site Logo"
            />
          </Box>
        </div>
      )}
      {/* End hero unit */}
      <Container maxWidth="md">
        <FrontPageNews news={frontPage.news} />
        <FrontPageUpdates updates={frontPage.updates} />
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
