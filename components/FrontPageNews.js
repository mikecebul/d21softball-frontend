import React from "react";
import Markdown from "markdown-to-jsx";
import moment from "moment";

import {
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  Box,
} from "@material-ui/core";

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
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  outterBox: {
    margin: theme.spacing(4, 0, 0, 0),
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

export default function FrontPageUpdates({ news }) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Typography
          component="h1"
          variant={mobile ? "h4" : "h2"}
          align="center"
          color="textPrimary"
          gutterBottom
        >
          News
        </Typography>
      </div>
      {news && (
        <Box className={classes.outterBox}>
          <Paper className={classes.paper} elevation={3}>
            <Box className={classes.box}>
              <Typography variant="h4" className={classes.date}>
                {moment(news.date).format("LL")}
              </Typography>
              <Typography>
                <Markdown>{news.content}</Markdown>
              </Typography>
              <Typography variant="h6" className={classes.author}>
                {news.from}
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
}
