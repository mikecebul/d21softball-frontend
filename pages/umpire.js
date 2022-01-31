import React, { useState } from "react";
import { API_URL, fromImageToUrl } from "../utils/urls";
import Markdown from "markdown-to-jsx";
import Link from "../src/Link";
import Image from "next/image";
import Sponsors from "../components/sponsors";

import {
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Box,
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
    padding: theme.spacing(8, 4, 2, 4),
  },
  content: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  // logo: {
  //   marginTop: theme.spacing(1),
  //   marginBottom: theme.spacing(5),
  //   [theme.breakpoints.up("md")]: {
  //     paddingLeft: theme.spacing(35),
  //     paddingRight: theme.spacing(35),
  //   },
  //   [theme.breakpoints.down("sm")]: {
  //     paddingLeft: theme.spacing(15),
  //     paddingRight: theme.spacing(15),
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     paddingLeft: theme.spacing(5),
  //     paddingRight: theme.spacing(5),
  //   },
  // },
  // outterBox: {
  //   margin: theme.spacing(0, 0, 4, 0),
  // },
  // paper: {
  //   margin: theme.spacing(0, 0, 4, 0),
  //   padding: theme.spacing(4, 8, 4, 8),
  //   [theme.breakpoints.down("xs")]: {
  //     padding: theme.spacing(4, 2, 4, 2),
  //   },
  //   height: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  // },
  // box: {
  //   flexDirection: "column",
  //   margin: theme.spacing(2, 0, 4, 0),
  //   [theme.breakpoints.down("md")]: {
  //     display: "flex",
  //     alignItems: "center",
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     paddingLeft: theme.spacing(3),
  //     paddingRight: theme.spacing(3),
  //   },
  // },
  // divider: {
  //   marginBottom: theme.spacing(4),
  // },
  outterBox: {
    margin: theme.spacing(0, 0, 0, 0),
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
  linkContent: {
    margin: theme.spacing(2, 0, 0, 0),
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

export default function Motel({ umpire, sponsors }) {
  const classes = useStyles();

  const info = umpire.umpire;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const align = matches ? "left" : "center";

  // console.log("Umpire :", info);

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
            {info.header}
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            {info.sub_header}
          </Typography>
        </div>
        {/* End Hero Unit */}
        <Container className={classes.content} maxWidth="md">
          <Box display="flex" flexDirection="column" justifyContent="center">
            {info ? (
              <>
                <Paper className={classes.paper} elevation={3}>
                  <Box className={classes.outterBox}>
                    <>
                      <Box>
                        {info.links.map((link) => (
                          <>
                            <Box className={classes.box} key={link.title}>
                              {link.title && (
                                <Typography variant="h6" align={align}>
                                  {link.title}
                                </Typography>
                              )}
                              {link.content && (
                                <Typography>
                                  <Markdown
                                    className={classes.linkContent}
                                    align={align}
                                  >
                                    {link.content}
                                  </Markdown>
                                </Typography>
                              )}
                              <Box p={1} />
                              {link.media && (
                                <Button
                                  className={classes.linkButton}
                                  size="small"
                                  endIcon={<ArrowRightIcon />}
                                  color="primary"
                                  variant="contained"
                                  component={Link}
                                  href={fromImageToUrl(link.media)}
                                >
                                  Check it out
                                </Button>
                              )}
                              {link.url && (
                                <a
                                  href={link.url}
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
                            <Divider className={classes.divider} />
                          </>
                        ))}
                      </Box>
                    </>
                  </Box>
                </Paper>
              </>
            ) : (
              <Box>
                <Typography>Currently no Umpire info right now.</Typography>
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
  const umpire_res = await fetch(`${API_URL}/umpire/`);
  const umpire = await umpire_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      umpire,
      sponsors,
    },
  };
}
