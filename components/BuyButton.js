import React, { useState, useEffect, useContext } from "react";
import { useCurrentUser } from "../context/CurrentUser";
import Head from "next/head";
import axios from "axios";
import router, { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PK, API_URL } from "../utils/urls";

const stripePromise = loadStripe("pk_test_51JRqZfK6osQEiLfg5lTb51JBXylk2BQZ1Swy3uetaUD4HfQv8OzwjSnwxABPTkQLQ9Rn13Ek5eWXvl3lRveaG8mA00ox6GHFWv")

export default function BuyButton({ tournament }) {

  const user = useCurrentUser()
  const router = useRouter()

  const redirectToLogin = () => {
    router.push('/login')
  }

  const handleBuy = async (e) => {
    const stripe = await stripePromise
    e.preventDefault()
    await axios
      .post(`${API_URL}/orders`, {tournament}, { withCredentials: true })
      .then((resp) => {
        const session = resp.data
        const result = stripe.redirectToCheckout({
          sessionId: session.id
        })
      })
      .catch((err) => {
        console.log('handleBuy errors:', err)
      })
    }

  return (
    <>
      {!user &&
        <Button variant="contained" onClick={redirectToLogin}>Login to Register</Button>
      }
      {user &&
        <Button variant="contained" onClick={handleBuy}>Register</Button>
      }
    </>
  )
}