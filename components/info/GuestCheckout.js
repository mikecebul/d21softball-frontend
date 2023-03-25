import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Link from "../../src/Link";
import BuyButton from "../BuyButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export function GuestCheckout({ tournament }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const [errorMsg, setErrorMsg] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // Validate email exists
  const validateEmail = () => {
    return new Promise((resolve, reject) => {
      setErrorMsg({
        email: "",
        password: "",
      });
      if (!email) {
        setErrorMsg({ email: "Please provide your email." });
        resolve({ isValid: false });
      } else {
        resolve({ isValid: true });
      }
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        REGISTER
      </Button>
      <Dialog
        onClose={handleClickClose}
        aria-labelledby="dialog-title"
        open={open}
      >
        <DialogTitle id="dialog-title" onClose={handleClickClose}>
          Please choose how you want to proceed
        </DialogTitle>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            aria-label="Guest checkout menu"
          >
            <Tab value={0} label="Guest" {...a11yProps(0)} />
            <Tab value={1} label="Login" {...a11yProps(1)} />
            <Tab value={2} label="Sign Up" {...a11yProps(2)} />
          </Tabs>
        </Paper>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <DialogContent>
              <DialogContentText>Continue as Guest</DialogContentText>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errorMsg?.email)}
                helperText={errorMsg?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMsg && (
                <Box pt={2}>
                  <Typography align="center" variant="subtitle2" color="error">
                    {errorMsg?.login}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClickClose}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
              <BuyButton tournament={tournament} email={email} />
            </DialogActions>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <DialogContent>
              <DialogContentText>
                Login to keep a history of your orders
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClickClose}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
              <Link href="/login">
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </Link>
            </DialogActions>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <DialogContent>
              <DialogContentText>
                Sign up if you haven't yet and keep a history of your orders
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClickClose}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
              <Link href="/signup">
                <Button variant="contained" color="primary">
                  Sign Up
                </Button>
              </Link>
            </DialogActions>
          </TabPanel>
        </SwipeableViews>
      </Dialog>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelled={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}
