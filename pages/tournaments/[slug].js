import React from "react";
import Head from "next/head";
import Link from "../../src/Link";
import parse from "html-react-parser";
import { fromImageToUrl, API_URL, fromImageToUrlSmall } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import BuyButton from "../../components/BuyButton";
import Sponsors from "../../components/sponsors";

import { useCurrentUser } from "../../context/CurrentUser";

import Moment from "react-moment";
import {
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Container,
} from "@material-ui/core";
import ImageCarouselTournament from "../../components/ImageCarouselTournament";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { GuestCheckout } from "../../components/GuestCheckout";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingBottom: theme.spacing(8),
  },
  card: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(5),
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // "56.25%", 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  price: {
    paddingLeft: theme.spacing(1),
  },
  bracket: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  imgRoot: {
    display: "flex",
    justifyContent: "center",
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));

const Tournament = ({ tournament, sponsors }) => {
  const classes = useStyles();
  const tournamentDate = moment(tournament.date_from).format("YYYY-MM-DD");
  const currentDate = moment().format("YYYY-MM-DD");

  const user = useCurrentUser();
  return (
    <>
      <Head>
        {tournament.meta_title && <title>{tournament.meta_title}</title>}
        {tournament.meta_description && (
          <meta
            name="description"
            content="add {tournament.meta_description}"
          />
        )}
        <base href="http//:localhost:1337" />
      </Head>
      <Container className={classes.content} maxWidth="md">
        <Card className={classes.card}>
          {tournament.image && (
            <CardMedia
              className={classes.cardMedia}
              image={fromImageToUrl(tournament.image)}
              title={tournament.meta_title}
            />
          )}
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {tournament.name}
            </Typography>
            <Typography>{tournament.class}</Typography>
            <Typography>{tournament.location}</Typography>
            <Typography variant="subtitle2">
              <Moment format="MMMM D, YYYY">{tournament.date_from}</Moment>
              {" - "}
              <Moment format="MMMM D, YYYY">{tournament.date_to}</Moment>
            </Typography>
            {tournament.content && (
              <Box mt={4}>{parse(tournament.content)}</Box>
            )}
          </CardContent>
          {/* Only show Price and Registration if Tournament is in the future */}
          {currentDate < tournamentDate && (
            <CardActions>
              {!user.isAuthenticated ? (
                <GuestCheckout tournament={tournament} />
              ) : (
                <BuyButton tournament={tournament} />
              )}
              <Typography variant="h6" className={classes.price}>
                ${twoDecimals(tournament.price)}
              </Typography>
            </CardActions>
          )}
        </Card>

        {(tournament.resultsMedia.length > 0 ||
          tournament.finalBracket ||
          tournament.bracketResults) && (
          <Paper>
            <Box className={classes.bracket}>
              {/* Carousel of Images */}
              {tournament.resultsMedia.length > 0 && (
                <ImageCarouselTournament tournament={tournament} />
              )}
              {tournament.finalBracket && (
                <Box mt={4} mb={4}>
                  <Link
                    href={{
                      pathname: `${API_URL}${tournament.finalBracket.url}`,
                    }}
                    target="_blank"
                  >
                    <Button variant="contained" color="secondary">
                      View Final Bracket
                    </Button>
                  </Link>
                </Box>
              )}
              {/* Markdown of Tournament Results */}
              {tournament.bracketResults && (
                <Box>{parse(tournament.bracketResults)}</Box>
              )}
            </Box>
          </Paper>
        )}
        <Sponsors sponsors={sponsors} />
      </Container>
    </>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const tournament_res = await fetch(`${API_URL}/tournaments/?slug=${slug}`);
  const found = await tournament_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      tournament: found[0], //Because the API reponse for filters is an array
      sponsors,
    },
  };
}

export async function getStaticPaths() {
  //Retrieve all the possible paths
  const tournaments_res = await fetch(`${API_URL}/tournaments/?_limit=1000`);
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
