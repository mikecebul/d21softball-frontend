import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK, API_URL } from "../utils/urls";

const stripePromise = loadStripe(STRIPE_PK);

export const handleBuy = async (tournament, email) => {
  const stripe = await stripePromise;
  await axios
    .post(`${API_URL}/orders`, { tournament, email }, { withCredentials: true })
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
