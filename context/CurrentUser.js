import React, { useEffect, useReducer, useContext, createContext } from "react";
import axios from "axios";
import { API_URL } from "../utils/urls";

const CurrentUserStateContext = createContext();
const CurrentUserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.user, isAuthenticated: true };
    case "LOGOUT":
      return { isAuthenticated: false };
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { isAuthenticated: false });

  // Request User Data -----------------
  useEffect(() => {
    const getUser = async () => {
      axios
        .get(`${API_URL}/users/me`, { withCredentials: true })
        .then((response) => {
          // Handle success.
          console.log("Data: ", response);
          if (user.id) {
            dispatch({ type: "LOGIN", user });
            return;
          }
        })
        .catch((err) => {
          // Handle error.
          console.log("An error occurred:", err.response);
        });
    };
    getUser();
  }, []);

  return (
    <CurrentUserDispatchContext.Provider value={dispatch}>
      <CurrentUserStateContext.Provider value={state}>
        {children}
      </CurrentUserStateContext.Provider>
    </CurrentUserDispatchContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserStateContext);
export const useDispatchCurrentUser = () =>
  useContext(CurrentUserDispatchContext);
