import mongoose from "mongoose";

export class MongoConnection{
    public connect(): void{
        const mongodbURl = "mongodb://localhost:27017/basic-api"

        mongoose.connect(mongodbURl).catch((error)=> {
            console.log(error.message); 
        });

        mongoose.connection.once('open',()=>{
            console.log("Mongo is connected to database");
        });

    }

}