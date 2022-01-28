import React, { useState } from "react";
import { API_URL } from "../utils/urls";
import Motel from "../components/info/Motel";
import Umpires from "../components/info/Umpires";
import Leagues from "../components/info/Leagues";
import PitcherClassification from "../components/info/PitcherClassification";
import Sponsors from "../components/sponsors";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  infoContent: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Info({ infoPage, sponsors }) {
  const classes = useStyles();
  const [page, setPage] = useState("Motel Info");

  // console.log("Misc Info:", miscInformation[0]);
  // const local_leagues = miscInformation[0].local_leagues;
  const umpires = infoPage.umpires;
  // const pitcherClassification = miscInformation[0].pitcher_classification;

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
              Viewing {page}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color={page === "Motel Info" ? "secondary" : "default"}
                    onClick={() => setPage("Motel Info")}
                  >
                    Motels
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={page === "Umpire Info" ? "secondary" : "default"}
                    onClick={() => setPage("Umpire Info")}
                  >
                    Umpires
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={
                      page === "Local Leagues Info" ? "secondary" : "default"
                    }
                    onClick={() => setPage("Local Leagues Info")}
                  >
                    Leagues
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={
                      page === "Pitcher Classification Info"
                        ? "secondary"
                        : "default"
                    }
                    onClick={() => setPage("Pitcher Classification Info")}
                  >
                    Pitchers
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.infoContent} maxWidth="md">
          {page === "Motel Info" && <Motel motel={infoPage.motel} />}
          {page === "Umpire Info" && <Umpires umpires={umpires} />}
          {page === "Local Leagues Info" && <Leagues leagues={local_leagues} />}
          {page === "Pitcher Classification Info" && (
            <PitcherClassification
              pitcherClassification={pitcherClassification}
            />
          )}
          <Sponsors sponsors={sponsors} />
        </Container>
      </main>
    </React.Fragment>
  );
}
export async function getStaticProps() {
  const infoPage_res = await fetch(`${API_URL}/info-page/`);
  const infoPage = await infoPage_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      infoPage,
      sponsors,
    },
  };
}
