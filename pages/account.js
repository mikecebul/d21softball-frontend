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
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 600,
  },
  paper: {
    marginTop: theme.spacing(4),
  },
}));

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
            // console.log(resp.data);
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
  const classes = useStyles();
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
            <TableContainer component={Paper} className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders &&
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell component="th" scope="row">
                          {new Date(order.created_at).toLocaleDateString(
                            "en-EN"
                          )}
                        </TableCell>
                        <TableCell>
                          {order.tournament?.id
                            ? order.tournament?.name
                            : order.camp?.name}
                        </TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>{order.id}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={5} mb={5}>
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
