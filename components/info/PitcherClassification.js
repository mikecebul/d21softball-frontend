import React from "react";
import Markdown from "markdown-to-jsx";
import { fromImageToUrl, API_URL } from "../../utils/urls";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(0, 0, 0, 4),
  },
  content: {
    paddingTop: theme.spacing(0),
  },
  list: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  spaceBottom: {
    marginBottom: theme.spacing(4),
  },
  spaceTop: {
    marginTop: theme.spacing(2),
  },
}));

export default function PitcherClassification({ pitcherClassification }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container className={classes.content} maxWidth="md">
        <Box>
          <Markdown>{pitcherClassification}</Markdown>
          {/* <Typography align="center" variant="h4">
            Fast Pitch Classification Committee Members
          </Typography>
          <Typography align="center">
            Scott Kelly - Committee Coordinator/Commissioner - Charlevoix
          </Typography>
          <Typography align="center">
            Bryan Smith - State Umpire In Chief - Lansing
          </Typography>
          <Typography align="center">
            Lou Kelly - Manager - Battle Creek
          </Typography>
          <Typography align="center">
            David Lach - Manager / Player - South Lyon
          </Typography>
          <Typography align="center">
            Shannon Damron - Pitcher - Marshall
          </Typography>
          <Typography align="center">Del Benson - Manager - Munger</Typography>
          <Typography align="center">
            Sean Kelly - Pitcher - Marshall
          </Typography>
          <Typography align="center">
            Jon Gwizdala - Pitcher - Bay City
          </Typography>
          <Typography align="center">
            Rick Schwemin - Manager / Player - Marquette
          </Typography>
          <Typography align="center">
            Aaron Davis - Player / Commissioner - St Joe
          </Typography>
          <Typography align="center">
            Jeff Weaver - Manager / Player - Sawyer
          </Typography>
          <Typography align="center">
            Rob McCormick - Commissioner - Ada
          </Typography>
          <Typography align="center">
            Troy Stowell - Michigan President / Commissioner / Player
          </Typography>
          <Typography align="center">
            Tim Hansen - Player - Ludington
          </Typography>
          <Typography align="center">
            Brad Gnatkowski - Player - Saginaw
          </Typography>
          <Typography align="center">
            Randy Wheelock - Player - Kingsley
          </Typography>
          <Typography align="center">
            Steve Jahnke - Umpire - Grand Rapids area
          </Typography>
          <Typography align="center">
            Jesse Beck - Manager / Player / League Director - Grand Rapids area
          </Typography>
          <Typography className={classes.spaceBottom} align="center">
            Jim Connors - Commissioner & UIC for District 4 Adrian / Jackson
            area, State Executive Committee Member and also umpires fastpitch in
            the Thumb League
          </Typography>
          <Divider padding={2} />
          <Typography className={classes.spaceTop} align="center">
            If you have questions about the appeal process, please send an email
            to Scott who will get the information to the 17 member committee
            that oversees Fast Pitch Pitcher Classification issues. Team
            classification are reviewed by the USA Softball of Michigan Fast
            Pitch Committee as well as this Pitcher Classification Committee,
            local commissioners and a final classification review committee that
            meets in Midland in early July each year. If you have questions,
            please email Scott at the link above.
          </Typography> */}
        </Box>
      </Container>
    </React.Fragment>
  );
}
