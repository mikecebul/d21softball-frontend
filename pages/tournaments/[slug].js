import React from "react";
import Head from "next/head";
import Link from "../../src/Link";
import Markdown from "markdown-to-jsx";
import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import BuyButton from "../../components/BuyButton";

import Moment from "react-moment";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ImageCarouselTournament from "../../components/ImageCarouselTournament";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
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

const Tournament = ({ tournament }) => {
  const classes = useStyles();
  const tournamentDate = moment(tournament.date_from).format("YYYY-MM-DD");
  const currentDate = moment().format("YYYY-MM-DD");

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
      </Head>
      <Container maxWidth="md">
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
              <Box mt={4}>
                <Markdown>{tournament.content}</Markdown>
              </Box>
            )}
          </CardContent>
          {/* Only show Price and Registration if Tournament is in the future */}
          {tournamentDate > currentDate && (
            <CardActions>
              <Link href={`/tournaments/${tournament.slug}`}>
                <BuyButton tournament={tournament}></BuyButton>
              </Link>
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
                <Box>
                  <Markdown>{tournament.bracketResults}</Markdown>
                </Box>
              )}
            </Box>
          </Paper>
        )}
      </Container>
    </>
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
  const tournaments_res = await fetch(`${API_URL}/tournaments/?limit=1000`);
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
