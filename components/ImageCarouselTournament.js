import React from "react";
import Image from "next/image";
import { API_URL } from "../utils/urls";
import Link from "../src/Link";
import MobileStepper from "@material-ui/core/MobileStepper";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../src/theme";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
  },
}));

function ImageCarouselTournament({ tournament }) {
  const classes = useStyles();
  const myLoader = ({ src, width, quality }) => {
    return `${API_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tournament.resultsMedia.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tournament.resultsMedia[activeStep].caption}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tournament.resultsMedia.map((item, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Link
                href={{
                  pathname: `${API_URL}${item.url}`,
                }}
                target="_blank"
              >
                <Image
                  loader={myLoader}
                  src={item.url}
                  alt={item.caption}
                  width={1920}
                  height={1080}
                  objectFit="scale-down"
                />
              </Link>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default ImageCarouselTournament;
