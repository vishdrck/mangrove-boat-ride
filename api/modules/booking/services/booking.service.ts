import { Schema } from "mongoose";
import { IBooking } from "../entity/booking.entity";
import bookingSchema from "../schema/booking.schema";

export class BookingService{

    public createBooking(newBoat:IBooking){
        const boat = new bookingSchema(newBoat);
       return boat.save();
    }
    public getBookingById(id:Schema.Types.ObjectId){
        return bookingSchema.find({_id: id}).exec();
    }

    public getAllBookings(){
        return bookingSchema.find({}).exec();
    }

    public deleteBookingById(id: Schema.Types.ObjectId){
        return bookingSchema.deleteOne({_id: id}).exec();
    }
    
    public updateBookingById(id: Schema.Types.ObjectId,modifiedBoat:IBooking){
        return bookingSchema.updateOne({_id: id},modifiedBoat).exec();
    }

}






