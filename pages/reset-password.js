import { useEffect, useState } from "react";
import { useCurrentUser } from "../context/CurrentUser";
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

  const currentUser = useCurrentUser();
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    if (currentUser.isAuthenticated) {
      router.push("/account");
    }
  }, []);

  // Vallidate email exists
  const passwordRegex = new RegExp("^(?=.{8,})");
  const validate = () => {
    return new Promise((resolve, reject) => {
      setErrorMsg(null);
      if (!passwordRegex.test(password)) {
        setErrorMsg("Password must be at least 8 characters.");
        resolve({ isValid: false });
      } else {
        resolve({ isValid: true });
      }
    });
  };

  // Handle login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    axios
      .post(
        `${API_URL}/auth/reset-password`,
        {
          code: router.query.code,
          password: password,
          passwordConfirmation: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // Handle success.
        console.log("Password Reset Response:", response);
        router.push("/login");
      })
      .catch((err) => {
        // Handle error.
        console.log("An error occurred:", err.response);
        setErrorMsg(err.response.data.data[0].messages[0].message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
            value={password}
            error={!passwordRegex.test(password)}
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
            Submit Password
          </Button>
          {errorMsg && (
            <Box pt={2}>
              <Typography align="center" variant="subtitle2" color="error">
                {errorMsg}
              </Typography>
            </Box>
          )}
        </form>
      </div>
    </Container>
  );
}