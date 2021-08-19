import { createContext, useState, useEffect } from "react";
import { API_URL } from "../utils/urls";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const router = useRouter();

  return (
    <AuthContext.Provider value={{ loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
