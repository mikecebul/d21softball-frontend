import React, { useState } from "react";
import Head from "next/head";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { useRouter } from "next/router";
import OrderTable from "../components/OrderTable";
import EditProfile from "../components/EditProfile";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Account() {
  const classes = useStyles();
  const dispatch = useDispatchCurrentUser();
  const user = useCurrentUser();
  const router = useRouter();
  const [tab, setTab] = useState("Edit Profile");

  // Edit Profile
  const handleTabSelection = () => {
    if (tab === "View Orders") {
      setTab("Edit Profile");
    }
    if (tab === "Edit Profile") {
      setTab("View Orders");
    }
  };

  // Logout User ----------------------
  const handleLogout = async () => {
    axios
      .post(`${API_URL}/logout`, {}, { withCredentials: true })
      .then((response) => {
        // Handle success.
        // console.log("Data: ", response.data);
        dispatch({ type: "LOGOUT" });
        router.push("/");
      })
      .catch((err) => {
        // Handle error.
        console.log("An error occurred:", err.response);
      });
  };

  return (
    <>
      <Head>
        <title>Account Page</title>
        <meta
          name="description"
          content="Account page where you can view payment history for Men's fastpitch softball in distrct 21 of Northern Michigan."
        />
      </Head>
      {!user.isAuthenticated ? (
        <div>
          <Typography>Please login or register</Typography>
        </div>
      ) : (
        <div>
          <Container maxWidth="md">
            <Typography variant="h2" align="center">
              Account
            </Typography>
            <Typography variant="h6" align="center">
              {user.email}
            </Typography>
            <Divider variant="middle" />

            {/* Display Orders || Edit Pofile */}
            {tab !== "View Orders" && <OrderTable />}
            {tab !== "Edit Profile" && <EditProfile />}

            {/* Display Account Action Buttons */}
            <Divider variant="middle" />
            <Box
              display="flex"
              justifyContent="center"
              mt={5}
              mb={5}
              className={classes.buttons}
            >
              <Button
                aria-label="Edit Profile"
                variant="contained"
                color="secondary"
                onClick={handleTabSelection}
              >
                {tab}
              </Button>
              <Button
                aria-label="logout"
                variant="contained"
                color="default"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Container>
        </div>
      )}
    </>
  );
}
