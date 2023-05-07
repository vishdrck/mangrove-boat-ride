import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingDateTime:{
        type: Date,
        required: true
    },
    boatID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    bookingPackage: {
        type: Schema.Types.ObjectId,
        required: true
    }

});

export default mongoose.model("Bookings",bookingSchema,"bookings");
