import React from "react";
import parse from "html-react-parser";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));

export default function League({ leagues }) {
  const classes = useStyles();
  console.log("Leagues:", leagues);

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pt={3}
          mb={3}
        >
          <Typography variant="h6">
            Local league coordinators need to send in information about their
            league to be posted on this page. Please send in contact information
            with names, phone numbers, email addresses so each league
            representative can be listed. We would also like to publish league
            schedules as they become available if you would please send these to
            Scott.
          </Typography>
          <Divider />
          <Box></Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
