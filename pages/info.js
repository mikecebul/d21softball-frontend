import React from "react";
import Hotel from "../components/info/hotel";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

export default function Info() {
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
              Information
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Viewing Motel Info
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid>
                  <Button variant="contained" color="secondary">
                    Motel Info
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Hotel />
      </main>
    </React.Fragment>
  );
}
