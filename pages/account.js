import React from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import Head from "next/head";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { useRouter } from "next/router";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function Account() {
  const dispatch = useDispatchCurrentUser();
  const user = useCurrentUser();
  const router = useRouter();

  // Logout User ----------------------
  const handleLogout = async () => {
    axios
      .post(`${API_URL}/logout`, { withCredentials: true })
      .then((response) => {
        // Handle success.
        console.log("Data: ", response.data);
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
          <Typography variant="h1" align="center">
            Account
          </Typography>
          <Typography variant="h6" align="center">
            {user.email}
          </Typography>
          <Button
            aria-label="logout"
            variant="contained"
            color="default"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
}
