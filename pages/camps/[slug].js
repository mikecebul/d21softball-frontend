import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "../../src/Link";
import Markdown from "markdown-to-jsx";

import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import BuyButton from "../../components/BuyButton";

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
  formControl: {
    minWidth: 100,
  },
  price: {
    paddingLeft: theme.spacing(1),
  },
}));

const Camp = ({ camp }) => {
  const classes = useStyles();
  const [type, setType] = React.useState("");

  const handleTypeSelect = (event) => {
    setType(event.target.value);
    camp.type = type;
    console.log("Camp Type:", camp.type);
  };

  return (
    <div>
      <Head>
        {camp.meta_title && <title>{camp.meta_title}</title>}
        {camp.meta_description && (
          <meta name="description" content="add {camp.meta_description}" />
        )}
      </Head>
      {/* <Image
        src={fromImageToUrl(camp.image)}
        alt="camp Image"
        width={1920}
        height={1080}
      /> */}

      <Container maxWidth="md">
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={fromImageToUrl(camp.image)}
            title={camp.meta_title}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {camp.name}
            </Typography>
            <Typography variant="subtitle2">{camp.location}</Typography>
            <Typography variant="subtitle2">
              <Moment format="MMMM D, YYYY">{camp.date_from}</Moment>
              {" - "}
              <Moment format="MMMM D, YYYY">{camp.date_to}</Moment>
            </Typography>
            <Box mt={4}>
              <Markdown>{camp.content}</Markdown>
            </Box>
          </CardContent>
          {/* Dropdown menu for type of Development Camp */}
          <Box ml={2} mb={2}>
            <FormControl className={classes.formControl} required>
              <InputLabel id="Workshop-select-type">Type</InputLabel>
              <Select
                variant="outlined"
                labelId="Workshop-select-type"
                id="Workshop-select-type"
                value={type}
                label="type"
                onChange={handleTypeSelect}
              >
                <MenuItem value={"Umpire"}>Umpire</MenuItem>
                <MenuItem value={"Pitcher"}>Pitcher</MenuItem>
                <MenuItem value={"Catcher"}>Catcher</MenuItem>
                <MenuItem value={"Player"}>Player</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <CardActions>
            <Link href={`/camps/${camp.slug}`}>
              <BuyButton variant="contained" camp={camp}></BuyButton>
            </Link>
            <Typography variant="h6" className={classes.price}>
              ${twoDecimals(camp.price)}
            </Typography>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const camp_res = await fetch(`${API_URL}/camps/?slug=${slug}`);
  const found = await camp_res.json();

  return {
    props: {
      camp: found[0], //Because the API reponse for filters is an array
    },
  };
}

export async function getStaticPaths() {
  //Retrieve all the possible paths
  const camps_res = await fetch(`${API_URL}/camps/`);
  const camps = await camps_res.json();

  //Return them to NextJS context
  return {
    paths: camps.map((camp) => ({
      params: { slug: String(camp.slug) },
    })),
    fallback: false, //Tells to nextjs to show a 404 if a param is not matched
  };
}

export default Camp;
