import { Schema } from "mongoose";

export interface IUser{
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}