import React from "react";
import { useCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK, API_URL } from "../utils/urls";

import { makeStyles } from "@material-ui/core/styles";

const stripePromise = loadStripe(STRIPE_PK);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function BuyButton({ tournament, email, selected }) {
  const classes = useStyles();
  const user = useCurrentUser();

  const handleBuy = async (e) => {
    const stripe = await stripePromise;
    e.preventDefault();
    await axios
      .post(
        `${API_URL}/orders`,
        { tournament, email },
        { withCredentials: true }
      )
      .then((resp) => {
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
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleBuy}
        disabled={!selected}
      >
        Register
      </Button>
    </>
  );
}
