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
// export async function getServerSideProps() {
//   const loginInfo = {
//     identifier: "test@test.com",
//     password: "pass123",
//   };

//   const login = await fetch(`${API_URL}/auth/local`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(loginInfo),
//   });

//   const loginResponse = await login.json();

//   return {
//     props: {
//       authData: loginResponse,
//     },
//   };
// }
