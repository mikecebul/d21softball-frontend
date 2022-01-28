import React, { useState, useEffect } from "react";
import Link from "../src/Link";
import { sortSponsors } from "../utils/sort";

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

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardMedia-root": {
      backgroundSize: "contain",
    },
    "& .MuiCardActionArea-root": {
      textAlign: "center",
    },
    // margin: theme.spacing(0, 4, 0, 8),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 2),
    marginTop: theme.spacing(2),
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
    margin: theme.spacing(2, 2, 0, 2),
  },
  cardContent: {
    flexGrow: 1,
  },
  divider: {
    marginBottom: theme.spacing(4),
  },
}));

export default function Sponsors({ sponsors }) {
  const classes = useStyles();

  const sortedSponsors = sortSponsors(sponsors);

  // console.log("Sorted Sponsors:", sortedSponsors);

  return (
    <React.Fragment>
      <div className={classes.root}>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Divider className={classes.divider} />
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Sponsors
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
          <Grid container spacing={4} justifyContent="center">
            {sortedSponsors.map((sponsor) => (
              <Grid item key={sponsor.name} xs={10} sm={5} md={4}>
                <Card className={classes.card} raised>
                  <CardActionArea>
                    <Link color="textPrimary" href={sponsor.url}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={fromImageToUrl(sponsor.logo)}
                        title={sponsor.name}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h3">
                          {sponsor.name}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
