import { Schema } from "mongoose";

export interface IUser{
    username: string;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}