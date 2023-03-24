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
  Typography,
  useTheme,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
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
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClickClose}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
              <BuyButton tournament={tournament} />
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
              <Button variant="contained" color="primary">
                Login
              </Button>
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
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
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
