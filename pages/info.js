import React, { useState } from "react";
import { API_URL } from "../utils/urls";
import Motel from "../components/info/Motel";
import Umpire from "../components/info/Umpire";
import League from "../components/info/League";
import Sponsors from "../components/sponsors";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PitcherClassification from "../components/info/PitcherClassification";

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

export default function Info({ miscInformation, sponsors }) {
  const classes = useStyles();
  const [infoPage, setInfoPage] = useState("Motel Info");

  // console.log("Misc Info:", miscInformation[0]);
  const local_leagues = miscInformation[0].local_leagues;
  const umpires = miscInformation[0].umpires;
  const pitcherClassification = miscInformation[0].pitcher_classification;

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
              Viewing {infoPage}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    color={infoPage === "Motel Info" ? "secondary" : "default"}
                    onClick={() => setInfoPage("Motel Info")}
                  >
                    Motels
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={infoPage === "Umpire Info" ? "secondary" : "default"}
                    onClick={() => setInfoPage("Umpire Info")}
                  >
                    Umpires
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={
                      infoPage === "Local Leagues Info"
                        ? "secondary"
                        : "default"
                    }
                    onClick={() => setInfoPage("Local Leagues Info")}
                  >
                    Leagues
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color={
                      infoPage === "Pitcher Classification Info"
                        ? "secondary"
                        : "default"
                    }
                    onClick={() => setInfoPage("Pitcher Classification Info")}
                  >
                    Pitchers
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.infoContent} maxWidth="md">
          {infoPage === "Motel Info" && <Motel />}
          {infoPage === "Umpire Info" && <Umpire umpires={umpires} />}
          {infoPage === "Local Leagues Info" && (
            <League leagues={local_leagues} />
          )}
          {infoPage === "Pitcher Classification Info" && (
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
  const miscInformation_res = await fetch(`${API_URL}/misc-informations/`);
  const miscInformation = await miscInformation_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      miscInformation,
      sponsors,
    },
  };
}
