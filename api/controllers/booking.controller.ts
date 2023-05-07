import {Request,Response } from "express";
import { BookingService } from "../modules/booking/services/booking.service";
import { Schema } from "mongoose";
import { IBooking } from "../modules/booking/entity/booking.entity";

export class BookingController{
    private bookingService:BookingService = new BookingService();

    public async createBooking(request: Request, response: Response) {
        if(Object.keys(request.body).length != 0){
            if(!request.body.bookingDateTime){
                return response.status(422).json({
                    status:"Failed",
                    message:"Booking Date and Time is required",
                    data:{}
                });
            }

            if(!request.body.boatID){
                return response.status(422).json({
                    status:"Failed",
                    message:"Boat ID is required",
                    data:{}
                });
            }

            if(!request.body.bookingPackage){
                response.status(422).json({
                    status:"Failed",
                    message:"Booking package is required",
                    data:{}
                });
            }

            const newBooking: IBooking = request.body;
            await this.bookingService.createBooking(newBooking);

            response.status(200).json({
                status : "Success",
                message : "Booking created successfully",
                data:{}
            });

        }else{
            response.status(422).json({
                status : "Failed",
                message : "Booking details required",
                data:{}
            });
        }
    }

    public async getBookingById(request: Request, response:Response){
        if(request?.query?.id){
            try{
                const bookingID = new Schema.Types.ObjectId(request.query.id?.toString())
                const answer = await this.bookingService.getBookingById(bookingID);

                response.status(200).json({
                    status: "Success",
                    message: "Booking details fetched successfully",
                    data: answer
                });

            }catch{
                response.status(500).json({
                    status: "Failed",
                    message:"Booking details fetch failed",
                    data: {}
                });

            }
        }
        response.status(422).json({
            status : "Failed",
            message : "Booking details fetched",
            data:{}
        });    
        
    }

    public async getAllBookings(request:Request,response:Response){
        try{
            const boats = await this.bookingService.getAllBookings();

            response.status(200).json({
                status : "Success",
                message : "Booking details fetched successfully",
                data:boats
            });

        }catch{
            response.status(422).json({
                status: "Failed",
                message: "Booking details fetch failed",
                data: {}
            });
        }
        
    }

    public async updateBookingById(request: Request, response:Response){
        if(request.query && request.query.id && request.query.boatRegNo && request.query.boatType && request.query.passengerCapacity){
            try{
                const bookingId = new Schema.Types.ObjectId(request.query.id?.toString());
                const modifiedBooking: IBooking = request.body;
               await this.bookingService.updateBookingById(bookingId,modifiedBooking);

                response.status(200).json({
                    status: "Success",
                    message: "Booking details updated successfully",
                    data: {}
                });

            }catch{
                response.status(500).json({
                    status: "Failed",
                    message: "Booking details updating failed",
                    data: {}
                })
            
        }
        response.status(422).json({
            status : "Failed",
            message :"Valid Booking details required to update",
            data: {}
        });
        
    }
}

    public async deleteBookingById(request: Request, response:Response){
        if(request?.query?.id){
            try{
                const bookingID = new Schema.Types.ObjectId(request.query.id.toString());
                await this.bookingService.deleteBookingById(bookingID);

                response.status(200).json({
                    status: "Success",
                    message: "Booking details deleted successfully",
                    data: {}
            
                });

            }catch{
                response.status(422).json({
                    status:"Failed",
                    message: "Booking details fetch failed",
                    data: {}
,
                });

            }
            
        }
        response.status(422).json({
            status : "Failed",
            message :"Booking details fetch failed",
            data:{}
        });
        
    }
    }
