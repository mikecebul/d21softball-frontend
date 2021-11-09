import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

import Image from "next/image";
import logo from "../public/logo.svg";
import { Typography, Card, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  news: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    flexDirection: "column",
  },
  date: {
    paddingBottom: theme.spacing(3),
  },
  author: {
    paddingTop: theme.spacing(3),
  },
}));

export default function Index() {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="center" pl={20} pr={20}>
        <Image src={logo} alt="Site Logo" />
      </Box>
      <Card className={classes.card}>
        <Paper>
          <Box className={classes.news}>
            <Typography variant="h4" className={classes.date}>
              July 27, 2021
            </Typography>
            <Typography variant="body2">
              Thank you all for a great tournament season where we conducted six
              consecutive weekend tournaments. The response from our downstate
              umpires and several of our local umpires were fabulous in helping
              us make it a great summer - proof that there are many who are
              willing to step up when the call to action comes along. The
              response from teams were very positive and most said they would be
              willing to pay a higher entry fee to help cover some of the
              additional costs for bringing in out of area umpires. Thank you!
              We have also been approached by two corporate sponsors willing to
              assist with some large financial contributions to help us develop
              a plan for creating more umpires, pitchers, catchers and players.
              We will be back in 2022 - but not as we have been in the past.
              Currently my plan is to create four "Development Saturdays" -
              perhaps in the month of June where we bring in 4 umpires, 40
              players consisting of 8 pitchers, 8 catchers and 24 position
              players from 11:00 am to 7:00 pm where we have two hours of
              instruction and 6 hours of live action. I will be approaching some
              "Instructors" to come and help lead each of these workshops where
              individuals can get a crash course in improving their skills.
              There will be a "Participant Fee" for these Development Saturdays
              to help offset some of the expenses as we try and bring in men
              ages 18 and up for the player portion of these workshops. I am
              hopeful to have an updated website that will provide more
              information and details about signing up for these Development
              Saturdays with an opportunity to pay on-line at the time. Also, we
              will be looking at having four weekend tournaments, three for men
              and one for women during the month of July when we have the best
              weather in northern Michigan following our 5 team, 4 game round
              robin format that we have used in the past. We are hoping to
              utilize our new website for sign-up and payment via credit card
              for these tournaments as well. As you can imagine, there will be a
              rush of teams wanting to get into the tournaments. I will come up
              with a plan to review past participants who have been very loyal
              to us over the years and send out invitations in advance of the
              general opening of the tournament availability. In addition to
              these activities, I am hopeful that we can also create some
              Saturday gym days for umpires, pitchers and catchers utilizing the
              local instructors that we have during the months of January,
              February and March. If you are interested in helping out as a
              local instructor, please contact me by email at scott@masad21.org.
              I will do my best to reach out to various instructors yet this
              summer for the four Development Saturdays in 2022 so that we can
              have four different umpires, pitchers, catchers and position
              players so that if someone wanted to participate in multiple
              weekends in the same or in different groups, they could learn from
              more instructors. We have a host of national caliber players and
              umpires from around Michigan that I will be asking to help us with
              these activities. I have much communications yet to do with our
              local city reps, local business groups, instructors from the area
              and across the state and team representatives to figure out what
              weekends will be best for the four different tournaments along
              with the family representatives from our different memorial
              tournaments. I invite all of you to get involved in one or more
              aspects of our plan and to consider replicating some of these
              ideas in your own communities. Fast pitch softball has been very
              good to me over the years and I'd like to see those same
              opportunities be made available for generations to come. Tired of
              seeing traditions getting left behind, here is your call to
              action. I am looking forward to many more seasons of fast pitch
              softball at the waterfront in Petoskey and all across this nation.
              Our time frame to have the new website and much of the details put
              together is mid-September of 2021. More to come!
            </Typography>
            <Typography variant="h6" className={classes.author}>
              Scott Kelly
            </Typography>
          </Box>
        </Paper>
      </Card>
    </Container>
  );
}
