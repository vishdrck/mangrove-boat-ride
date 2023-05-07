import mongoose, { Schema } from "mongoose";
import { IUser } from "../../user/entity/user.entity";


export interface IAuth {
    _id: Schema.Types.ObjectId;
    token: string;
    expiryDate: Date;
}

export interface ILoginUser extends IUser {
    _id: Schema.Types.ObjectId;
  }
  