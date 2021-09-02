import { useState } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import { API_URL } from "../utils/urls";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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

  const user = useCurrentUser();
  const dispatch = useDispatchCurrentUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMsg, setErrorMsg] = useState();

  // Validate form
  const validateForm = () => {
    return new Promise((resolve, reject) => {
      setErrorMsg({
        firstName: "",
        lastName: "",
      });
      if (!firstName) {
        setErrorMsg({ firstName: "Please provide your first Name." });
        resolve({ isValid: false });
      } else if (!lastName) {
        setErrorMsg({ lastName: "Please provide your last Name." });
        resolve({ isValid: false });
      } else {
        resolve({ isValid: true });
      }
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm().then((response) => {
      if (response.isValid) {
        axios
          .put(
            `${API_URL}/users/${user.id}`,
            {
              firstName: firstName,
              lastName: lastName,
            },
            {
              withCredentials: true,
            }
          )
          .then((resp) => {
            // Handle success.
            // console.log("User Updated:", resp);
            dispatch({ type: "UPDATE", firstName, lastName });
            setErrorMsg({
              edit: "User Updated",
            });
          })
          .catch((err) => {
            // Handle error.
            console.log("An error occurred:", err.response);
            setErrorMsg({
              edit: err.response?.data.message,
            });
          });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            error={Boolean(errorMsg?.firstName)}
            helperText={errorMsg?.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="lastName"
            id="lastName"
            autoComplete="family-name"
            error={Boolean(errorMsg?.lastName)}
            helperText={errorMsg?.lastName}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Edit Profile
          </Button>
          {errorMsg && (
            <Box pt={2}>
              <Typography align="center" variant="subtitle2" color="error">
                {errorMsg?.edit}
              </Typography>
            </Box>
          )}
        </form>
      </div>
    </Container>
  );
}
