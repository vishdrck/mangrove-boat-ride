import mongoose from "mongoose";

const Schema = mongoose.Schema;

const boatSchema = new Schema({
    boatRegNo: {
        type:String,
        required:true
    },
    boatType:{
        type:String,
        required:true
    },
    passengerCapacity:{
        type:Number,
        required:true
    },
    boatDriverId:{
        type:Schema.Types.ObjectId,
        required:true
    }


});

export default mongoose.model("Boats",boatSchema,"boats");