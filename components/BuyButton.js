import React from "react";
import { useCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK, API_URL } from "../utils/urls";
import Link from "../src/Link";

import { makeStyles } from "@material-ui/core/styles";

const stripePromise = loadStripe(STRIPE_PK);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function BuyButton({ tournament, camp }) {
  const classes = useStyles();
  const user = useCurrentUser();

  const handleBuy = async (e) => {
    const stripe = await stripePromise;
    e.preventDefault();
    await axios
      .post(
        `${API_URL}/orders`,
        { tournament, camp },
        { withCredentials: true }
      )
      .then((resp) => {
        console.log("handle buy respone:", resp.data);
        const session = resp.data;
        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });
      })
      .catch((err) => {
        console.log("handleBuy errors:", err);
      });
  };

  return (
    <>
      {!user.isAuthenticated && (
        <Button
          className={classes.button}
          variant="contained"
          component={Link}
          href="/login"
        >
          Login to Register
        </Button>
      )}
      {user.isAuthenticated && (
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleBuy}
        >
          Register
        </Button>
      )}
    </>
  );
}
