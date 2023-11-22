import React from "react";
import Head from "next/head";
import Link from "../../src/Link";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Sponsors from "../../components/sponsors";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fromImageToUrl, API_URL } from "../../utils/urls";
import {
  compareDate,
} from "../../utils/sort";
import { getCurrentYear, getYearRange } from "../../utils/format";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardActionArea-root": {
      textAlign: "center",
    },
    // margin: theme.spacing(0, 4, 0, 8),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 2, 2, 2),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(6, 2, 2, 2),
    },
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(5),
    },
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

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const currentYear = getCurrentYear();
  const newTournamentList = tournaments;
  const compared = compareDate(currentYear, newTournamentList);

   // Filter tournaments for the determined year
   const filteredTournaments = tournaments.filter(tournament => 
    new Date(tournament.date_from).getFullYear() === compared.dateYear);
    console.log(filteredTournaments)
    console.log(compared.dateYear)


  return (
    <React.Fragment>
      <Head>
        <title>Tournaments</title>
        <meta
          name="description"
          content="Tournaments for men's fastpitch softball in distrct 21 of Northern Michigan."
        />
      </Head>
      <main className={classes.root}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant={mobile ? "h4" : "h2"}
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {compared.dateYear} Tournaments
            </Typography>
            <Typography
              variant={mobile ? "body1" : "h5"}
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
          )}
          <Sponsors sponsors={sponsors} />
        </Container>
      </main>
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const currentYear = getCurrentYear();
  const { startDate } = getYearRange(currentYear);
  const tournament_res = await fetch(`${API_URL}/tournaments?_where[date_from_gte]=${startDate}&_sort=date_from:ASC`);
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
