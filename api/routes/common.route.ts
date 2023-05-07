import { Application,Request,Response } from "express";

export class CommonRoutes{
    public route(app:Application){
        app.get("/",(request:Request,response:Response)=>{
            response.status(200).json({
                status:"success",
                message:"Get is working "
            });
        });


    }
}