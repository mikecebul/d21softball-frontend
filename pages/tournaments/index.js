import Link from "../../src/Link";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";

import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginBottom: 25,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: 25,
    maxWidth: 800,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
  },
  image: {
    width: 360,
    height: 180,
    [theme.breakpoints.down("sm")]: {
      width: 180,
      height: 90,
    },
  },
  date: {
    paddingLeft: 10,
  },
  space: {
    marginBottom: 15,
  },
}));

const Tournaments = ({ tournaments }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        className={classes.title}
      >
        Tournaments
      </Typography>
      <div className={classes.root}>
        {tournaments.map((tournament) => (
          <div key={tournament.name}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <Link href={`/tournaments/${tournament.slug}`}>
                      <Image
                        src={fromImageToUrl(tournament.image)}
                        alt="tournament Image"
                        layout="fill"
                      />
                    </Link>
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {tournament.name}
                      </Typography>
                      <Typography variant="body2" className={classes.space}>
                        {tournament.class}
                      </Typography>

                      {/**Showing Dates */}
                      <Typography variant="subtitle2" display="inline">
                        Starts:
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        display="inline"
                        className={classes.date}
                      >
                        {tournament.date_from}
                      </Typography>
                      <Typography />
                      <Typography variant="subtitle2" display="inline">
                        Ends:
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        display="inline"
                        className={classes.date}
                      >
                        {tournament.date_to}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Link href={`/tournaments/${tournament.slug}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ cursor: "pointer" }}
                        >
                          Learn More
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      ${twoDecimals(tournament.price)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const tournament_res = await fetch(`${API_URL}/tournaments/`);
  const tournaments = await tournament_res.json();

  return {
    props: {
      tournaments,
    },
  };
}

export default Tournaments;
