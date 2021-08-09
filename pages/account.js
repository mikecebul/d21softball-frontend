import { React, useContext } from "react";
import Head from "next/head";
import AuthContext from "../context/AuthContext";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function Account() {
  // console.log(authData.authData)
  // const user = authData.authData.user

  const { user, logoutUser } = useContext(AuthContext);

  if (!user) {
    return (
      <div>
        <Typography>Please login or register</Typography>
      </div>
    );
  }
  if (user) {
    // getUser(token);
  }
  return (
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
        onClick={logoutUser}
      >
        Logout
      </Button>
    </div>
  );
}
