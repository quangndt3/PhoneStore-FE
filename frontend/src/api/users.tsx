import { IUser } from "../models";
import instance from "./instance";


export const signup = (account:IUser) => {
    return instance.post("/signup",account);
}

export const signin = (account:IUser) => {
    return instance.post("/signin",account);
}

