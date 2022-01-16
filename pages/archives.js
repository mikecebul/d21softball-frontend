import React, { useState } from "react";
import Link from "../src/Link";
import Moment from "react-moment";
import Sponsors from "../components/sponsors";

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

import { fromImageToUrl, API_URL } from "../utils/urls";
import {
  uniqueYears,
  sortIncrement,
  filteredItems,
  sortDecrement,
  compareDate,
} from "../utils/sort";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
  sponsorDivider: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(16),
  },
}));

const Archives = ({ tournaments, sponsors }) => {
  const classes = useStyles();

  // Sorted Tournaments from earliest to latest
  const sortedList = sortIncrement(tournaments);
  const years = uniqueYears(sortedList);

  // Remove lastest year from the list if the season istn't over yet
  const compared = () => {
    let x = compareDate(years[0]);
    if (x.warning === false) {
      return years.shift();
    }
    return years;
  };
  compared();

  // set last completed season year then filter list and sort in order
  const [currentDate, setCurrentDate] = useState(years[0]);
  const filteredTournaments = sortDecrement(
    filteredItems(sortedList, currentDate)
  );

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
              Tournament Archives
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Viewing <Moment format="YYYY">{currentDate}</Moment> Archives
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                {years.map((date, index) => (
                  <Grid item key={index}>
                    <Button
                      variant="contained"
                      color={currentDate === date ? "secondary" : "default"}
                      onClick={() => setCurrentDate(date)}
                    >
                      <Moment format="YYYY">{date}</Moment>{" "}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Container>
        </div>
        {/* End hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            {filteredTournaments.map((tournament) => (
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
          <Divider className={classes.sponsorDivider} />
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

export default Archives;
