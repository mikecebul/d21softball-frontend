import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import { API_URL } from "../utils/urls";

import Typography from "@material-ui/core/Typography";
import {
  Box,
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
    minWidth: 340,
  },
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: theme.palette.success.main,
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

export default function OrderTable() {
  const classes = useStyles();
  const user = useCurrentUser();

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
              const paidOrders = resp.data.filter(
                (order) => order.status === "paid"
              );
              setOrders(paidOrders);
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

  const { orders, loading } = useOrders(user);

  return (
    <>
      {loading && (
        <Typography variant="body1" align="center">
          Loading your orders...
        </Typography>
      )}
      {!loading && (
        <TableContainer component={Paper} className={classes.paper}>
          <Typography variant="h6" align="center">
            Here are your orders {user.firstName} {user.lastName}
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>Date</TableCell>
                <TableCell className={classes.head}>Tournament</TableCell>
                <TableCell className={classes.head}>Team</TableCell>
                <TableCell className={classes.head}>Total</TableCell>
                <TableCell className={classes.head}>ID</TableCell>
                <TableCell className={classes.head}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6">You have no orders to display</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                orders
                  .filter((order) => order.status === "paid")
                  .map((filteredOrder) => (
                    <TableRow key={filteredOrder.id}>
                      <TableCell component="th" scope="row">
                        {new Date(filteredOrder.created_at).toLocaleDateString(
                          "en-EN"
                        )}
                      </TableCell>
                      <TableCell>
                        {filteredOrder.tournament?.id
                          ? filteredOrder.tournament?.name
                          : filteredOrder.camp?.name}
                      </TableCell>
                      <TableCell>{filteredOrder.team}</TableCell>
                      <TableCell>${filteredOrder.total}</TableCell>
                      <TableCell>{filteredOrder.id}</TableCell>
                      <TableCell>
                        <Typography className={classes.status}>
                          {filteredOrder.status.toUpperCase()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
