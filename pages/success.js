import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_URL } from "../utils/urls";
import axios from "axios";
import Link from "../src/Link";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2, 6, 2, 6),
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
    // paddingLeft: theme.spacing(6),
    // paddingRight: theme.spacing(6),
    margin: theme.spacing(0, 4, 8, 4),
  },
}));

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      await axios
        .post(
          `${API_URL}/orders/confirm`,
          { checkout_session: session_id },
          { withCredentials: true }
        )
        .then((resp) => {
          // console.log("fetchOrder complete:", resp);
          setOrder(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          setOrder(null);
          // console.log("fetchOrder Error:", err);
        });
      setLoading(false);
    };
    fetchOrder();
  }, [session_id]);

  return { order, loading };
};

export default function Success() {
  const classes = useStyles();

  const router = useRouter();
  const { session_id } = router.query;
  // console.log("Session ID:", session_id);

  const { order, loading } = useOrder(session_id);

  console.log("Order:", order);

  return (
    <div>
      <Head>
        <title>Thank you for registering!</title>
        <meta
          name="description"
          content="Thank you for registering for men's fastpitch softball in distrct 21 of Northern Michigan."
        />
      </Head>
      <Box p={(2, 4)}>
        <Typography variant="h2" align="center">
          Success
        </Typography>
      </Box>
      {loading && (
        <Typography variant="subtitle1" align="center">
          Loading...
        </Typography>
      )}
      {order && (
        <div>
          <Box display="flex" justifyContent="center">
            <Paper className={classes.paper}>
              <Typography display="block" variant="subtitle1" align="center">
                Your order of{" "}
                <strong>
                  {order.tournament?.name}
                  {order.camp?.name}{" "}
                </strong>
                with <strong>order number: {order.id}</strong> is complete!
              </Typography>
              {/* <Typography display="block" variant="h6" align="center">
                {order.tournament?.name}
                {order.camp?.name}
              </Typography>
              <Typography display="block" variant="subtitle1" align="center">
                with order number: {order.id}
              </Typography>
              <Typography display="block" variant="subtitle1" align="center">
                is complete
              </Typography> */}
              <Box display="flex" justifyContent="center" mt={2}>
                <Typography variant="caption" align="center">
                  You will be recieving an email from the District Commissioner
                  soon
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" href="/account">
                  Continue to Account
                </Button>
              </Box>
            </Paper>
          </Box>
        </div>
      )}
    </div>
  );
}
