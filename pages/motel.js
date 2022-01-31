import React, { useState } from "react";
import { API_URL, fromImageToUrlSmall } from "../utils/urls";
import Markdown from "markdown-to-jsx";
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
    // margin: theme.spacing(0, 4, 0, 8),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 4, 2, 4),
  },
  content: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
    // margin: theme.spacing(0, 0, 4, 0),
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

  const align = matches ? "left" : "center";

  // console.log("Motel :", motel);

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
            Motel Info
          </Typography>
          <Typography
            variant="h5"
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
                      <Typography variant="body1" align="center">
                        <Markdown>{info.content}</Markdown>
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
