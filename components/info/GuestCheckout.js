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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleBuy } from "../../utils/handleBuy";
import { useForm, Controller } from "react-hook-form";

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

  const registerSchema = z.object({
    email: z
      .string()
      .nonempty("Email field is required")
      .email("Email is invalid"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    const email = data.email;
    handleBuy(tournament, email);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleChangeTab = (event, newValue) => {
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
            onChange={handleChangeTab}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <DialogContentText>
                  To continue as a guest, enter your email to receive
                  information throughout the payment process.
                </DialogContentText>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      margin="normal"
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      fullWidth
                      autoFocus
                      required
                      disabled={isSubmitting}
                      error={!!error}
                      helperText={errors.email ? errors.email.message : null}
                    />
                  )}
                ></Controller>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClickClose}
                  variant="outlined"
                  color="primary"
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Continue
                </Button>
              </DialogActions>
            </form>
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
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
