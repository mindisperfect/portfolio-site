import { NavigateFunction } from "react-router-dom";
import { create } from "zustand";
import Cookies from "js-cookie";

import { ROLE, TOKEN } from "../constants";

import { message } from "antd";
import { request } from "../server/request";

interface userLogin {
  username: string;
  password: string;
}

type AuthTypes = {
  isAutheticated: boolean | true;
  login: (data: userLogin, navigate: NavigateFunction) => void;
  logout: () => void;
};

export const useAuth = create<AuthTypes>((set) => ({
  role: Cookies.get(ROLE) || null,
  isAutheticated: Cookies.get(TOKEN) ? true : false,
  login: async (data, navigate) => {
    try {
      const res = await request.post("auth/login", data);
      Cookies.set(TOKEN, res.data.token);
      set({ isAutheticated: true });
      navigate("/dashboard");
    } catch (err) {
      message.error("Username or password is wrong !");
    }
  },
  logout: () => {
    Cookies.remove(TOKEN);
    set({ isAutheticated: false });
  },
}));


