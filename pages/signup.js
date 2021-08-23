import React, { useEffect, useState } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "../src/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  err: {
    paddingTop: 2,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();

  const dispatch = useDispatchCurrentUser();
  const currentUser = useCurrentUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState();

  // Check if user is already logged in
  useEffect(() => {
    if (currentUser.isAuthenticated) {
      router.push("/account");
    }
  }, []);

  const passwordRegex = new RegExp("^(?=.{8,})");

  const validate = () => {
    return new Promise((resolve, reject) => {
      setErrorMsg({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      if (!firstName) {
        setErrorMsg({ firstName: "Please provide a first name." });
        resolve({ isValid: false });
      } else if (!lastName) {
        setErrorMsg({ lastName: "Please provide a last name." });
        resolve({ isValid: false });
      } else if (!email) {
        setErrorMsg({ email: "Please provide your email." });
        resolve({ isValid: false });
      } else if (!password) {
        setErrorMsg({ password: "Please provide your password." });
        resolve({ isValid: false });
      } else if (!passwordRegex.test(password)) {
        setErrorMsg({ password: "Password must be at least 8 characters." });
        resolve({ isValid: false });
      } else {
        resolve({ isValid: true });
      }
    });
  };

  // Handle register Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate().then((response) => {
      if (response.isValid) {
        axios
          .post(
            `${API_URL}/auth/local/register`,
            {
              firstName: firstName,
              lastName: lastName,
              username: email,
              email: email,
              password: password,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            // Handle success.
            console.log("Login Response:", response);
            dispatch({ type: "LOGIN", user: response.data.user });
            router.push("/account");
          })
          .catch((err) => {
            // Handle error.
            console.log("An error occurred:", err.response);
            setErrorMsg({ register: err.response.data.data[0].messages[0].message });
          });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="first-name"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={Boolean(errorMsg?.firstName)}
                helperText={errorMsg?.firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="last-name"
                error={Boolean(errorMsg?.lastName)}
                helperText={errorMsg?.lastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={Boolean(errorMsg?.email)}
                helperText={errorMsg?.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(errorMsg?.password)}
                helperText={errorMsg?.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
          {errorMsg && (
            <Box pt={2}>
              <Typography align="center" variant="subtitle2" color="error">
                {errorMsg.register}
              </Typography>
            </Box>
          )}
        </form>
      </div>
    </Container>
  );
}
