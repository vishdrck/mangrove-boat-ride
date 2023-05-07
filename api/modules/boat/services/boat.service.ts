import { Schema } from "mongoose";
import { IBoat } from "../entity/boat.entity";
import boatSchema from "../schema/boat.schema";

export class BoatService{

    public createBoat(newBoat:IBoat){
        const boat = new boatSchema(newBoat);
       return boat.save();
    }

    public getBoatById(id:Schema.Types.ObjectId){
        return boatSchema.find({_id: id}).exec();
    }

    public getAllBoat(){
        return boatSchema.find({}).exec();
    }

    public deleteBoatById(id: Schema.Types.ObjectId){
        return boatSchema.deleteOne({_id: id}).exec();
    }
    
    public updateBoatById(id: Schema.Types.ObjectId,modifiedBoat:IBoat){
        return boatSchema.updateOne({_id: id},modifiedBoat).exec();
    }

}






