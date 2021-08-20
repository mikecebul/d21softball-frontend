import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "../../src/Link";


import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import { makeStyles } from "@material-ui/core/styles";

import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(10),
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

const Tournament = ({ tournament }) => {
  
  const classes = useStyles();

  return (
    <div>
      <Head>
        {tournament.meta_title && <title>{tournament.meta_title}</title>}
        {tournament.meta_description && (
          <meta name="description" content="add {tournament.meta_description}" />
        )}
      </Head>
      {/* <Image
        src={fromImageToUrl(tournament.image)}
        alt="tournament Image"
        width={1920}
        height={1080}
      /> */}
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={fromImageToUrl(tournament.image)}
          title={tournament.meta_title}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {tournament.name}
          </Typography>
          <Typography>{tournament.class}</Typography>
          <Typography variant="subtitle2">
            <Moment format="MMMM Do YYYY">
              {tournament.date_from}
            </Moment>
          </Typography>
          <Box mt={4}>
            <Typography variant="span">{tournament.content}</Typography>
        </Box>
        </CardContent>
        <CardActions>
          <Link href={`/tournaments/${tournament.slug}`}>
            <Button size="small" color="primary">
              View
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const tournament_res = await fetch(`${API_URL}/tournaments/?slug=${slug}`);
  const found = await tournament_res.json();

  return {
    props: {
      tournament: found[0], //Because the API reponse for filters is an array
    },
  };
}

export async function getStaticPaths() {
  //Retrieve all the possible paths
  const tournaments_res = await fetch(`${API_URL}/tournaments/`);
  const tournaments = await tournaments_res.json();

  //Return them to NextJS context
  return {
    paths: tournaments.map((tournament) => ({
      params: { slug: String(tournament.slug) },
    })),
    fallback: false, //Tells to nextjs to show a 404 if a param is not matched
  };
}

export default Tournament;
