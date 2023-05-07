import {Request,Response, query } from "express";
import { BoatService } from "../modules/boat/services/boat.service";
import { IBoat } from "../modules/boat/entity/boat.entity";
import { Schema } from "mongoose";

export class BoatController{
    private boatService:BoatService = new BoatService();

    public async createBoat(request: Request, response: Response) {
        if(Object.keys(request.body).length != 0){
            if(!request.body.boatRegNo){
                return response.status(422).json({
                    status:"Failed",
                    message:"Boat registration number is required",
                    data:{}
                });
            }

            if(!request.body.boatType){
                return response.status(422).json({
                    status:"Failed",
                    message:"Boat type is required",
                    data:{}
                });
            }

            if(!request.body.passengerCapacity){
                response.status(422).json({
                    status:"Failed",
                    message:"Boat passenger capacity is required",
                    data:{}
                });
            }

            const newBoat: IBoat = request.body;
            await this.boatService.createBoat(newBoat);

            response.status(200).json({
                status : "Success",
                message : "Boat created successfully",
                data:{}
            });

        }else{
            response.status(422).json({
                status : "Failed",
                message : "Boat details required",
                data:{}
            });
        }
    }

    public async getBoatById(request: Request, response:Response){
        if(request.query && request.query.id){
            try{
                const userId = new Schema.Types.ObjectId(request.query.id?.toString())
                const answer = await this.boatService.getBoatById(userId);

                response.status(200).json({
                    status: "Success",
                    message: "Get user endpoint is success",
                    data: answer
                });

            }catch{
                response.status(500).json({
                    status: "Failed",
                    message:"Get Boat details from database failed",
                    data: {}
                });

            }
        }
        response.status(422).json({
            status : "Failed",
            message : "Get endpoint failed",
            data:{}
        });    
        
    }

    public async getAllBoats(request:Request,response:Response){
        try{
            const boats = await this.boatService.getAllBoat();

            response.status(200).json({
                status : "Success",
                message : "Boat details get successfully",
                data:boats
            });

        }catch{
            response.status(422).json({
                status: "Failed",
                message: "Get All endpoint is failed",
                data: {}
            });
        }
        
    }

    public async updateBoatById(request: Request, response:Response){
        if(request.query && request.query.id && request.query.boatRegNo && request.query.boatType && request.query.passengerCapacity){
            try{
                const boatId = new Schema.Types.ObjectId(request.query.id?.toString());
                const modifyBoat: IBoat = request.body;
               await this.boatService.updateBoatById(boatId,modifyBoat);

                response.status(200).json({
                    status: "Success",
                    messeage: "Boat details updated successfullu",
                    data: {}
                });

            }catch{
                response.status(500).json({
                    status: "Failed",
                    message: "Boat details uodating failed",
                    data: {}
                })
            
        }
        response.status(422).json({
            status : "Failed",
            message :"Boat details requird to update",
            data: {}
        });
        
    }
}

    public async deleteBoatById(request: Request, response:Response){
        if(request.query && request.query.id){
            try{
                const boatId = new Schema.Types.ObjectId(request.query.id?.toString());
                await this.boatService.deleteBoatById(boatId);

                response.status(200).json({
                    status: "Success",
                    message: "Boat deleted successfully",
                    data: {}
            
                });

            }catch{
                response.status(422).json({
                    status:"Failed",
                    message: "Delete boat from database failed",
                    data: {}
,
                });

            }
            
        }
        response.status(422).json({
            status : "Failed",
            message :"Delete endpoint failed",
            data:{}
        });
        
    }
    }
