import {
  Button,
  Container,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backButtonMobile: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up("lg")]: {
      marginLeft: theme.spacing(5),
    },
  },
}));

function BackButton({ router }) {
  const classes = useStyles();
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      {!desktop ? (
        <Container maxWidth="md">
          <Button
            variant="outlined"
            color="primary"
            className={classes.backButtonMobile}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Container>
      ) : (
        <Container maxWidth="lg">
          <Button
            variant="outlined"
            color="primary"
            className={classes.backButtonMobile}
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Container>
      )}
    </>
  );
}

export default BackButton;
