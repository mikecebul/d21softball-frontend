import React from "react";
import Markdown from "markdown-to-jsx";
import { fromImageToUrl, API_URL } from "../utils/urls";
import Sponsors from "../components/sponsors";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
  },
  fameContent: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(8),
  },
  list: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

export default function HallOfFame({ hallOfFames, sponsors }) {
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
        <Container className={classes.fameContent} maxWidth="md">
          <Paper elevation={3}>
            <Box className={classes.list}>
              <Markdown>{hallOfFames[0].list}</Markdown>
            </Box>
          </Paper>
          <Sponsors sponsors={sponsors} />
        </Container>
      </main>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const hallOfFame_res = await fetch(`${API_URL}/hall-of-fames/`);
  const hallOfFames = await hallOfFame_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      hallOfFames,
      sponsors,
    },
  };
}
