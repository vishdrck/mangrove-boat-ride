import { Schema } from "mongoose";

export interface IBoat{
    boatRegNo: String;
    boatType: string;
    passengerCapacity: Number
    boatDriverId: Schema.Types.ObjectId
}