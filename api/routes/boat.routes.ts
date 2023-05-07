import { Application,Request,Response, request } from "express";
import { BoatController } from "../controllers/boat.controller";


export class BoatRoutes{

    private boatCntroller: BoatController = new BoatController();

    public route(app:Application){
        app.get("/boat",(request:Request,response:Response)=>{
          this.boatCntroller.getBoatById(request,response);
        });
        app.post("/boat",(request:Request,response:Response)=>{
            this.boatCntroller.createBoat(request,response);
            
        });
        app.get("/boat/{id}",(request:Request,response:Response)=>{
            this.boatCntroller.getAllBoats(request,response);
        });
        app.delete("/boat/{id}",(request:Request,response:Response)=>{
            this.boatCntroller.deleteBoatById(request,response);
        });
        app.put("/boat/{id}",(request:Request,response:Response)=>{
            this.boatCntroller.updateBoatById(request,response);
        });
    }

}