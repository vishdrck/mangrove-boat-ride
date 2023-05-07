import { Date, Schema } from "mongoose";

export interface IBooking{
    bookingDateTime: Date;
    boatId: Schema.Types.ObjectId;
    bookingPackage: Schema.Types.ObjectId;

}