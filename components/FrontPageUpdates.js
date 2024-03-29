import React from "react";
import parse from "html-react-parser";
import { API_URL } from "../utils/urls";

import Link from "../src/Link";

import {
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
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 2, 0),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(6, 0, 0, 0),
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
  outterBox: {
    margin: theme.spacing(4, 0, 4, 0),
  },
  date: {
    paddingBottom: theme.spacing(3),
  },
  author: {
    paddingTop: theme.spacing(3),
  },
  updateButton: {
    margin: theme.spacing(4, 0, 0, 0),
    // [theme.breakpoints.down("md")]: {
    //   alignSelf: "center",
    // },
  },
  link: {
    textDecoration: "none",
  },
  content: {
    margin: theme.spacing(2, 0, 0, 0),
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
}));

export default function FrontPageUpdates({ updates }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const align = matches ? "left" : "center";

  // console.log("Updates:", updates);

  return (
    <>
      {updates && (
        <>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Divider className={classes.divider} />
            <Typography
              component="h2"
              variant={mobile ? "h4" : "h2"}
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Updates
            </Typography>
          </div>
          <Box className={classes.outterBox}>
            <Paper className={classes.paper} elevation={3}>
              {updates.map((update) => (
                <React.Fragment key={update.id}>
                  <Box className={classes.box}>
                    {update.title && (
                      <Typography variant="h6" align={align}>
                        {update.title}
                      </Typography>
                    )}
                    {update.content && (
                      <Typography
                        component="div"
                        className={classes.content}
                        align={align}
                      >
                        {parse(update.content)}
                      </Typography>
                    )}
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
                  </Box>
                  <Divider className={classes.divider} />
                </React.Fragment>
              ))}
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}
