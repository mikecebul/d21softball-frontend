import React from "react";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { fromImageToUrl } from "../../utils/urls";

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

export default function Motel({ motel }) {
  const classes = useStyles();

  // console.log("URL:", motel.media);
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box display="flex" flexDirection="column" justifyContent="center">
          {motel ? (
            <>
              <Box>
                <Typography variant="h2" align="center">
                  {motel.title}
                </Typography>
                <Typography variant="h6" align="center">
                  <Markdown>{motel.content}</Markdown>
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                className={classes.logo}
              >
                <a target="_blank" href={motel.url}>
                  <Image
                    src={fromImageToUrl(motel.media)}
                    alt="Link to local Motels"
                    height={motel.media.height}
                    width={motel.media.width}
                  ></Image>
                  <Typography variant="caption">
                    Petoskey Area Hotel Listings
                  </Typography>
                </a>
              </Box>
            </>
          ) : (
            <Box>
              <Typography>Currently no motel info right now.</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
