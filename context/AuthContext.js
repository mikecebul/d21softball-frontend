import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const loginUser = async (email, password) => {
    const loginInfo = {
      identifier: email,
      password: password,
    };

    const login = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    const loginResponse = await login.json();
    setUser(loginResponse.user);
    // console.log(loginResponse.user);
    router.push("/account");
  };

  const logoutUser = async () => {
    setUser(null);
    router.push("/");
  };
  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
