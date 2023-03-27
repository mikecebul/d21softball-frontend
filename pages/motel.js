import React, { useState } from "react";
import Head from "next/head";
import { API_URL, fromImageToUrlSmall } from "../utils/urls";
import parse from "html-react-parser";
import Image from "next/image";
import Sponsors from "../components/sponsors";

import {
  Box,
  Container,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
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
  logo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(35),
      paddingRight: theme.spacing(35),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(15),
      paddingRight: theme.spacing(15),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  outterBox: {
    // margin: theme.spacing(0, 0, 4, 0),
  },
  paper: {
    padding: theme.spacing(4, 8, 4, 8),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4, 2, 4, 2),
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  box: {
    flexDirection: "column",
    margin: theme.spacing(2, 0, 4, 0),
    [theme.breakpoints.down("md")]: {
      display: "flex",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
}));

export default function Motel({ motel, sponsors }) {
  const classes = useStyles();

  const info = motel.info;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const align = matches ? "left" : "center";

  // console.log("Motel :", motel);

  return (
    <React.Fragment>
      <Head>
        <title>Motel Information</title>
        <meta
          name="description"
          content="Motel information for staying in Petoskey while attending events for Men's fastpitch softball in distrct 21 of Northern Michigan."
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
            Motel Info
          </Typography>
          <Typography
            variant={mobile ? "body1" : "h5"}
            align="center"
            color="textSecondary"
            paragraph
          >
            Wondering where you're going to stay after the event?
          </Typography>
        </div>
        {/* End Hero Unit */}
        <Container className={classes.content} maxWidth="md">
          <Box display="flex" flexDirection="column" justifyContent="center">
            {info ? (
              <>
                <Box className={classes.outterBox}>
                  <Paper className={classes.paper} elevation={3}>
                    <Box>
                      <Typography variant="h4" align="center">
                        {info.title}
                      </Typography>
                      <Typography
                        component="div"
                        variant="body1"
                        align="center"
                      >
                        {parse(info.content)}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      className={classes.logo}
                    >
                      <a target="_blank" href={info.url}>
                        <Image
                          src={fromImageToUrlSmall(info.media)}
                          alt="Link to local Motels"
                          height={info.media.height}
                          width={info.media.width}
                        ></Image>
                        <Typography variant="caption">
                          Petoskey Area Hotel Listings
                        </Typography>
                      </a>
                    </Box>
                  </Paper>
                </Box>
              </>
            ) : (
              <Box>
                <Typography>Currently no motel info right now.</Typography>
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
  const motel_res = await fetch(`${API_URL}/motel/`);
  const motel = await motel_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      motel,
      sponsors,
    },
  };
}
