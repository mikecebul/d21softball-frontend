import React from "react";
import Head from "next/head";
import Link from "../../src/Link";
import Image from "next/image";
import Sponsors from "../../components/sponsors";

import Moment from "react-moment";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { fromImageToUrl, API_URL, fromImageToUrlSmall } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";

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
}));

const DevelopmentWorkshops = ({ camps, sponsors }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  // Sorted camps from earliest to latest
  const sortedcamps = camps.sort((a, b) =>
    a.date_from > b.date_from ? 1 : -1
  );
  return (
    <React.Fragment>
      <Head>
        <title>Development Workshops</title>
        <meta
          name="description"
          content="Development workshops for Men's fastpitch softball in distrct 21 of Northern Michigan."
        />
      </Head>
      <main className={classes.root}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant={mobile ? "h4" : "h2"}
              align="center"
              color="textPrimary"
              gutterBottom
            >
              <Moment format="YYYY">{sortedcamps[0].date_from}</Moment>{" "}
              Development Workshops
            </Typography>
            <Typography
              variant={mobile ? "body1" : "h5"}
              align="center"
              color="textSecondary"
              paragraph
            >
              Get prepared for the upcomming season
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={4} justifyContent="center">
            {sortedcamps.map((camp) => (
              <Grid item key={camp.name} xs={10} sm={5} md={4}>
                <Card className={classes.card} raised>
                  <CardActionArea>
                    <Link
                      color="textPrimary"
                      href={`/development-workshops/${camp.slug}`}
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={fromImageToUrlSmall(camp.image)}
                        title={camp.meta_title}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {camp.name}
                        </Typography>
                        <Typography variant="subtitle2">
                          {camp.location}
                        </Typography>
                        <Typography variant="subtitle2">
                          <Moment format="MMMM D, YYYY">
                            {camp.date_from}
                          </Moment>
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Sponsors sponsors={sponsors} />
        </Container>
      </main>
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const camp_res = await fetch(`${API_URL}/camps/`);
  const camps = await camp_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      camps,
      sponsors,
    },
  };
}

export default DevelopmentWorkshops;
