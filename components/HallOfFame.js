import React from "react";
import Markdown from "markdown-to-jsx";
import { fromImageToUrl, API_URL } from "../utils/urls";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(0, 0, 0, 4),
  },
  fameContent: {
    paddingTop: theme.spacing(0),
  },
  list: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

export default function HallOfFame({ hallOfFames }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div>
        {/* Hero unit */}
        <div className={classes.fameContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Hall of Fame
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Current Members of the USA Softball of Michigan (former MASA) Hall
              of Fame representing District 21 Softball
            </Typography>
          </Container>
        </div>
        <Container className={classes.fameContent} maxWidth="md">
          <Paper elevation={3}>
            <Box className={classes.list}>
              <Markdown>{hallOfFames[0].list}</Markdown>
            </Box>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}
