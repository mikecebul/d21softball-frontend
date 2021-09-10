import React from "react";
import Markdown from "markdown-to-jsx";
import { fromImageToUrl, API_URL } from "../utils/urls";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
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
            {/* <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Secondary Text
            </Typography> */}
          </Container>
        </div>
        <Container maxWidth="md">
          <Paper>
            <Box className={classes.list}>
              <Markdown>{hallOfFames[0].list}</Markdown>
            </Box>
          </Paper>
        </Container>
      </main>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const hallOfFame_res = await fetch(`${API_URL}/hall-of-fames/`);
  const hallOfFames = await hallOfFame_res.json();

  return {
    props: {
      hallOfFames,
    },
  };
}
