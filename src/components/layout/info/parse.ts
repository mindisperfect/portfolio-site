import { REGISTER_TOKEN } from "../../../constants";

const localStorageItem = localStorage.getItem(REGISTER_TOKEN) || '';

const role = JSON.parse(localStorageItem)?.role;
const ID = JSON.parse(localStorageItem)?._id;

export const ROLE = role;
export const USER_ID = ID;