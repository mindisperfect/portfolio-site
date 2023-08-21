import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import Cookies from "js-cookie";

import { TOKEN } from "../constants";

import { message } from "antd";
import { request } from "../server/request";

interface userLogin {
  username: string;
  password: string;
}

type AuthTypes = {
  isAuthenticated: boolean | true;
  login: (data: userLogin, navigate: NavigateFunction) => void;
  logout: () => void;
};

export const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Cookies.get(TOKEN) ? true : false,
  login: async (data, navigate) => {
    try {
      const res = await request.post("auth/login", data);
      Cookies.set(TOKEN, res.data.token);
      set({ isAuthenticated: true });
      navigate("/dashboard");
    } catch (err) {
      message.error("Username or password is wrong !");
    }
  },
  logout: () => {
    Cookies.remove(TOKEN);
    set({ isAuthenticated: false });
  },
}));


import { useEffect, useState } from "react";
import { getDataRegister } from "../utils/sendData";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [callback, setCallback] = useState(false);
  const recall = () => {
    setCallback(!callback);
  };

  useEffect(() => {
    setLoading(true);
    getDataRegister(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, callback]);

  return {
    data: data.data,
    loading,
    error,
    recall,
  };
};

export default useFetch;
