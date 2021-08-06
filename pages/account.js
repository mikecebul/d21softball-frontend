import React from 'react';
import Typography from '@material-ui/core/Typography';
import { API_URL } from '../utils/urls';

export default function Account(authData) {
    console.log(authData.authData)
    const user = authData.authData.user
  return (
    <React.Fragment>
      <Typography variant="h1" align="center">
        Account
      </Typography>
      <Typography variant="h6" align="center">
          {user.email}
      </Typography>
    </React.Fragment>
  );
}
export async function getServerSideProps() {
    const loginInfo = {
        identifier: "test@test.com",
        password: "pass123"
    }

    const login = await fetch(`${API_URL}/auth/local`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })

    const loginResponse = await login.json()

    return {
        props: {
            authData: loginResponse
        }
    }
}
