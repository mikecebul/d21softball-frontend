import { createContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../utils/urls";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Login User ---------------------
  const loginUser = async (email, password) => {
    axios
      .post(
        `${API_URL}/auth/local`,
        {
          identifier: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        setUser(response.data.user);
        // setToken(response.data.jwt);
        setError(null);
        router.push("/account");
      })
      .catch((err) => {
        // Handle error.
        console.log("An error occurred:", err.response);
        // setError(err.response.data.data[0].messages[0].message);
      });
  };

  // Logout User ----------------------
  const logoutUser = async () => {
    router.push("/");
    setUser(null);
    setToken(null);
  };

  // Request User Data -----------------
  const getUser = async () => {
    axios
      .get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle success.
        console.log("Data: ", response.data);
      })
      .catch((err) => {
        // Handle error.
        console.log("An error occurred:", err.response);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, error, loginUser, logoutUser, getUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
