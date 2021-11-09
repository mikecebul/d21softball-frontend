import React from "react";
import Image from "next/image";
import Motel_Logo from "../../public/Petoskey-Area-Logo-Green.png";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  logo: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up("xs")]: {
      paddingLeft: theme.spacing(35),
      paddingRight: theme.spacing(35),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
}));

export default function Hotel() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pt={3}
        >
          <Typography variant="h6">
            Please book hotel rooms well in advance of the summer softball
            season. At this time, we are unable to secure discounted rates for
            our softball teams at any of the local hotels. Feel free to
            negotiate with each hotel on your own.
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" className={classes.logo}>
          <a target="_blank" href="https://www.petoskeyarea.com/stay/">
            <Image src={Motel_Logo} alt="Link to local Motels"></Image>
            <Typography variant="caption">
              Petoskey Area Hotel Listings
            </Typography>
          </a>
        </Box>
      </Container>
    </React.Fragment>
  );
}
