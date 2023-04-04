import React, { useState } from "react";
import Head from "next/head";
import Link from "../../src/Link";
// import Markdown from "markdown-to-jsx";
import parse from "html-react-parser";
import Sponsors from "../sponsors";

import Moment from "react-moment";

import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import BuyButton from "../BuyButton";

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
  formControl: {
    minWidth: 166,
  },
  price: {
    paddingLeft: theme.spacing(1),
  },
  inputLabel: {
    paddingLeft: theme.spacing(2),
  },
}));

const DevelopmentWorkshops = ({ camp, sponsors }) => {
  const classes = useStyles();

  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const [type, setType] = useState("");
  const [selected, setSelected] = useState(false);

  const handleTypeSelect = (e) => {
    setType(e.target.value);
    setSelected(true);
    camp.type = e.target.value;
  };
  const date = camp.date_from.substring(0, 10);
  // console.log(moment(date).format("MMMM Do, YYYY"));

  return (
    <div>
      <Head>
        {camp.meta_title && <title>{camp.meta_title}</title>}
        {camp.meta_description && (
          <meta name="description" content="add {camp.meta_description}" />
        )}
      </Head>
      <Container className={classes.content} maxWidth="md">
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
            <Box mt={4}>{parse(camp.content)}</Box>
          </CardContent>
          {/* Dropdown menu for type of Development Camp */}
          <Box ml={2} mb={2}>
            <FormControl className={classes.formControl} required>
              <InputLabel
                className={classes.inputLabel}
                id="Workshop-select-type"
              >
                Type
              </InputLabel>
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
            <Link href={`/development-workshops/${camp.slug}`}>
              <BuyButton
                variant="contained"
                camp={camp}
                selected={selected}
              ></BuyButton>
            </Link>
            <Typography variant="h6" className={classes.price}>
              ${twoDecimals(camp.price)}
            </Typography>
          </CardActions>
        </Card>
        <Sponsors sponsors={sponsors} />
      </Container>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const camp_res = await fetch(`${API_URL}/camps/?slug=${slug}`);
  const found = await camp_res.json();

  const sponsor_res = await fetch(`${API_URL}/sponsors/`);
  const sponsors = await sponsor_res.json();

  return {
    props: {
      camp: found[0], //Because the API reponse for filters is an array
      sponsors,
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

export default DevelopmentWorkshops;
