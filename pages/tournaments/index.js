import React, { useState } from "react";
import Link from "../../src/Link";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Sponsors from "../../components/sponsors";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardActionArea from "@material-ui/core/CardActionArea";
import Divider from "@material-ui/core/Divider";

import { fromImageToUrl, API_URL } from "../../utils/urls";
import {
  filteredItems,
  uniqueYears,
  sortIncrement,
  sortDecrement,
  compareDate,
} from "../../utils/sort";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardActionArea-root": {
      textAlign: "center",
    },
    // margin: theme.spacing(0, 4, 0, 8),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

const Tournaments = ({ tournaments, sponsors }) => {
  const classes = useStyles();
  const router = useRouter();

  // Sorted Tournaments from earliest to latest
  const sortedList = sortIncrement(tournaments);
  const years = uniqueYears(sortedList);
  const mostRecentTournamentYear = years[0];
  const newTournamentList = sortDecrement(
    filteredItems(sortedList, mostRecentTournamentYear)
  );

  // Compare today's date with the date of the most recent tournaments to decide whether to display them or not
  const compared = compareDate(mostRecentTournamentYear, newTournamentList);

  return (
    <React.Fragment>
      <main className={classes.root}>
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
              {compared.dateYear} Tournaments
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              All tourneys are fast pitch
            </Typography>
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          {compared.warning ? (
            <>
              <Typography align="center" variant="h6">
                Next year's tournaments will be posted soon
              </Typography>
              <Box pt={4} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => router.push("/archives")}
                >
                  View Tournament Archives
                </Button>
              </Box>
            </>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {newTournamentList.map((tournament) => (
                <Grid item key={tournament.name} xs={10} sm={5} md={4}>
                  <Card className={classes.card} raised>
                    <CardActionArea>
                      <Link
                        color="textPrimary"
                        href={`/tournaments/${tournament.slug}`}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={fromImageToUrl(tournament.image)}
                          title={tournament.meta_title}
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h3">
                            {tournament.name}
                          </Typography>
                          <Divider className={classes.divider} />
                          <Typography>{tournament.class}</Typography>
                          <Typography variant="subtitle2">
                            <Moment format="MMMM D, YYYY">
                              {tournament.date_from}
                            </Moment>
                          </Typography>
                        </CardContent>
                      </Link>
                    </CardActionArea>
                    {/* <CardActions>
                    <Link href={`/tournaments/${tournament.slug}`}>
                      <Button size="small" color="primary">
                        View
                      </Button>
                    </Link>
                  </CardActions> */}
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Sponsors sponsors={sponsors} />
        </Container>
      </main>
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const tournament_res = await fetch(`${API_URL}/tournaments/?_limit=1000`);
  const tournaments = await tournament_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      tournaments,
      sponsors,
    },
  };
}

export default Tournaments;
