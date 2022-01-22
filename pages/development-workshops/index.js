import React from "react";
import Link from "../../src/Link";
import Image from "next/image";
import Sponsors from "../../components/sponsors";

import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CardActionArea from "@material-ui/core/CardActionArea";
import Divider from "@material-ui/core/Divider";

import { fromImageToUrl, API_URL } from "../../utils/urls";
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
}));

const DevelopmentWorkshops = ({ camps, sponsors }) => {
  const classes = useStyles();

  // Sorted camps from earliest to latest
  const sortedcamps = camps.sort((a, b) =>
    a.date_from > b.date_from ? 1 : -1
  );
  return (
    <React.Fragment>
      <main className={classes.root}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              <Moment format="YYYY">{sortedcamps[0].date_from}</Moment>{" "}
              Development Workshops
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}

          <Grid container spacing={4} justifyContent="center">
            {sortedcamps.map((camp) => (
              <Grid item key={camp.name} xs={12} sm={6} md={4}>
                <Card className={classes.card} raised>
                  <CardActionArea>
                    <Link
                      color="textPrimary"
                      href={`/development-workshops/${camp.slug}`}
                    >
                      <CardMedia
                        className={classes.cardMedia}
                        image={fromImageToUrl(camp.image)}
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
