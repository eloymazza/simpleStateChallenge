import { useState } from "react";
import { loginUser } from "../services/login";
import { LoginResponse } from "../utils/types";

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response: LoginResponse = await loginUser(email, password);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return {
    login,
    isLoggedIn
  };
};

export default useLogin;
