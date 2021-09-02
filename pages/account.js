import React, { useState } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import Head from "next/head";
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
      {!user.isAuthenticated ? (
        <div>
          <Typography>Please login or register</Typography>
        </div>
      ) : (
        <div>
          <Head>
            <title>Account Page</title>
            <meta
              name="description"
              content="The Account page to view you MASA D21 activity"
            />
          </Head>
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
                color="primary"
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
