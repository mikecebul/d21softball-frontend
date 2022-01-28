import React from "react";
import Markdown from "markdown-to-jsx";
import { fromImageToUrl, API_URL } from "../../utils/urls";

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
  content: {
    paddingTop: theme.spacing(0),
  },
  list: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  spaceBottom: {
    marginBottom: theme.spacing(4),
  },
  spaceTop: {
    marginTop: theme.spacing(2),
  },
}));

export default function PitcherClassification({ pitcherClassification }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container className={classes.content} maxWidth="md">
        <Box>
          <Markdown>{pitcherClassification}</Markdown>
        </Box>
      </Container>
    </React.Fragment>
  );
}
