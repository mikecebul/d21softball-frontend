import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../context/CurrentUser";
import axios from "axios";
import { API_URL } from "../utils/urls";

import Typography from "@material-ui/core/Typography";
import {
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
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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
                <TableCell className={classes.head}>Name</TableCell>
                <TableCell className={classes.head}>Total</TableCell>
                <TableCell className={classes.head}>ID</TableCell>
                <TableCell className={classes.head}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell component="th" scope="row">
                      {new Date(order.created_at).toLocaleDateString("en-EN")}
                    </TableCell>
                    <TableCell>
                      {order.tournament?.id
                        ? order.tournament?.name
                        : order.camp?.name}
                    </TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
