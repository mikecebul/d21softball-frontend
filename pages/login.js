import { useEffect, useState } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  err: {
    paddingTop: 2,
  },
}));

export default function Login() {
  const classes = useStyles();
  const router = useRouter();

  const dispatch = useDispatchCurrentUser();
  const currentUser = useCurrentUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState();

  // Check if user is already logged in
  useEffect(() => {
    if (currentUser.isAuthenticated) {
      router.push("/account");
    }
  }, []);

  // Validate email exists
  const validateEmail = () => {
    return new Promise((resolve, reject) => {
      setErrorMsg({
        email: '',
        password: '',
      });
      if (!email) {
        setErrorMsg({ email: "Please provide your email." });
        resolve({ isValid: false });
      } else {
        resolve({ isValid: true });
      }
    });
  };
  // Validate Login
  const validateLogin = () => {
    return new Promise((resolve, reject) => {
      setErrorMsg({
        email: '',
        password: '',
      });
      if (!email) {
        setErrorMsg({ email: "Please provide your email." });
        resolve({ isValid: false });
      } else if (!password) {
        setErrorMsg({ password: "Please provide your password." });
        resolve({ isValid: false });
      } else {
        resolve({ isValid: true });
      }
    });
  };

  // Handle login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateLogin().then((response) => {
      if (response.isValid) {
        axios
          .post(
            `${API_URL}/auth/local`,
            {
              identifier: email,
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
            setErrorMsg({ login: err.response.data.data[0].messages[0].message });
          });
      }
    })
  };

  // Handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    validateEmail().then((response) => {
      if (response.isValid) {
        console.log(email);
        axios
          .post(
            `${API_URL}/auth/forgot-password`,
            {
              email: email, // user's email
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log("Your user received an email");
            setErrorMsg({ login: "Check your inbox for an email from us." });
          })
          .catch((err) => {
            console.log("An error occurred:", err.response);
            setErrorMsg({ login: err.response.data.data[0]?.messages[0].message || "Unable to email this address. Contact support." });
          });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            error={Boolean(errorMsg?.password)}
            helperText={errorMsg?.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => handleForgotPassword(e)}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          {errorMsg && (
            <Box pt={2}>
              <Typography align="center" variant="subtitle2" color="error">
                {errorMsg?.login}
              </Typography>
            </Box>
          )}
        </form>
      </div>
    </Container>
  );
}
