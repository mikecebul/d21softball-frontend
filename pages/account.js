import React, { useState, useEffect } from "react";
import { useCurrentUser, useDispatchCurrentUser } from "../context/CurrentUser";
import Head from "next/head";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { useRouter } from "next/router";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

// fetch orders ----------------------
const useOrders = (user) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      if (user.isAuthenticated) {
        setLoading(true);
        await axios
          .get(`${API_URL}/orders`, { withCredentials: true })
          .then((resp) => {
            setOrders(resp.data);
            console.log(resp.data);
          })
          .catch((err) => {
            setOrders([]);
          });
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);
  return { orders, loading };
};

export default function Account() {
  const dispatch = useDispatchCurrentUser();
  const user = useCurrentUser();
  const router = useRouter();

  const { orders, loading } = useOrders(user);

  // Logout User ----------------------
  const handleLogout = async () => {
    axios
      .post(`${API_URL}/logout`, {}, { withCredentials: true })
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
          <Divider variant="middle" />
          <Typography variant="h6" align="center">
            Your Orders
          </Typography>
          {loading && (
            <Typography variant="body1" align="center">
              Loading your orders...
            </Typography>
          )}
          {orders &&
            orders.map((order) => (
              <Box key={order.id}>
                <Typography variant="subtitle1" align="center">
                  {new Date(order.created_at).toLocaleDateString("en-EN")} |{" "}
                  {order.tournament?.name || order.camp?.name} | ${order.total}{" "}
                  | {order.status}
                </Typography>
              </Box>
            ))}
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
