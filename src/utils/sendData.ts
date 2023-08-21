import {AxiosResponse} from "axios"
import { request } from "../server/request";



export const getDataRegister = (url: string,): Promise<AxiosResponse> => {
    return request.post(url);
  };
