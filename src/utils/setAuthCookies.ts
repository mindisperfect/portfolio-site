import Cookies from "js-cookie";
import {  TOKEN, USER } from "../constants";

export function setAuthCookies({ token, user }: { token: string, user: string }) {
  Cookies.set(TOKEN, token);
  Cookies.set(USER, user);
}

let ROLE = 'ROLE';

const storedValue = Cookies.get(USER);
if (typeof storedValue === 'string' && storedValue) {
    const parse = JSON.parse(storedValue)?.role;
    if (parse) {
        ROLE = parse;
    }
}
export { ROLE };

const userData = Cookies.get(USER);
let parseId: string | undefined;

if (userData) {
  const parsedUserData = JSON.parse(userData);
  parseId = parsedUserData?._id;
}

export const USER_ID = parseId;



