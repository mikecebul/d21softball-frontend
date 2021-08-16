import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../utils/urls";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
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
        setUser(response.data.user);
        setError(null);
        router.push("/account");
      })
      .catch((err) => {
        // Handle error.
        console.log("An error occurred:", err.response);
        setError(err.response.data.data[0].messages[0].message);
      });
  };

  // Logout User ----------------------
  const logoutUser = async () => {
    axios
      .post(`${API_URL}/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        // Handle success.
        console.log("Data: ", response.data);
        setUser(null);
        router.push("/");
        console.log(user);
      })
      .catch((err) => {
        // Handle error.
        console.log("An error occurred:", err.response);
      });
  };

  // Request User Data -----------------
  useEffect(() => {
    const getUser = async () => {
      axios
        .get(`${API_URL}/users/me`, { withCredentials: true })
        .then((response) => {
          // Handle success.
          console.log("Data: ", response.data);
          setUser(response.data);
        })
        .catch((err) => {
          // Handle error.
          console.log("An error occurred:", err.response);
        });
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
