import {Request,Response} from "express";
import { IUser } from "../modules/user/entity/user.entity";
import { UserService } from "../modules/user/services/user.service";
import { Schema } from "mongoose";

export class UserController{

    private userService:UserService =  new UserService();

    public async getUser(request:Request,response:Response){
        if(request?.query?.id ){
            try{
                const userId = new Schema.Types.ObjectId(request.query.id.toString());
                const answer = await this.userService.filterUsers(userId);

                response.status(200).json({
                    status: "Success",
                    message: "Get user endpoint is success",
                    data: answer
                });

            }catch{
                response.status(500).json({
                    status : "Failed",
                    message : "Get user details from database failed",
                    data:{}
                });
            }
        }

        response.status(422).json({
            status : "Failed",
            message : "Get endpoint failed ",
            data:{}
        });
    }

    public async getAllUsers(request:Request,response:Response){
        try{
            const users = await this.userService.filterUsers({});

            response.status(200).json({
                status: "Success",
                message: "get all users endpoint is success",
                data: users

            });

        }catch{
            response.status(422).json({
                status: "Failed",
                message: "Get all user endpooint is failed",
                data: {}
            })

        }
        
    }

    public createUser(request: Request, response: Response) {
        if(Object.keys(request.body).length != 0){
            if(!request.body.username){
                return response.status(422).json({
                    status:"Failed",
                    message:"User name required",
                    data:{}
                });
            }

            if(!request.body.firstName){
                return response.status(422).json({
                    status:"Failed",
                    message:"First name required",
                    data:{}
                });
            }

            if(!request.body.email){
                response.status(422).json({
                    status:"Failed",
                    message:"Email required",
                    data:{}
                });
            }

            if(!request.body.password){
                response.status(422).json({
                    status:"Failed",
                    message:"Password required",
                    data:{}
                });
            }

            const newUser: IUser = request.body;
            this.userService.createUser(newUser);

            response.status(200).json({
                status : "Success",
                message : "User created successfully",
                data:{}
            });

        }else{
            response.status(422).json({
                status : "Failed",
                message : "User details required",
                data:{}
            });
        }

    }

    // public updateUser(request: Request, response: Response) {

    //         // ithuru tikat   check krnna request.body....
    //         if(request.query && request.query.id && request.body && request.body.username ) {
    //         const userId = new Schema.Types.ObjectId(request.query.id?.toString());

    //         const modifyUser: IUser = request.body;
    //             this.userService.updateUser(userId, modifyUser).then(()=> {
    //                 response.status(200).json({
    //                     status : "Success",
    //                     message : "User details updated successfull",
    //                     data:{}
    //                 });
    //             }).catch((error)=> {
    //                 response.status(500).json({
    //                     status : "Failed",
    //                     message : "User details updated failed",
    //                     data:{}
    //                 });
    //             })
    //         } 

    //         response.status(422).json({
    //             status : "Failed",
    //             message : "User details required",
    //             data:{}
    //         });


    // }

    public async updateUser(request: Request, response: Response) {

        if(request.query && request.query.id && request.body && request.body.username && request.body.firstName && request.body.email && request.body.password) {
            try {
                const userId = new Schema.Types.ObjectId(request.query.id?.toString());

                const modifyUser: IUser = request.body;
                    await this.userService.editUser(userId, modifyUser);
        
                    response.status(200).json({
                        status : "Success",
                        message : "User details added",
                        data:{}
                    });
            } catch{
                response.status(500).json({
                    status : "Failed",
                    message : "User details adding failed",
                    data:{}
                });
            }
        
        } 
        response.status(422).json({
            status : "Failed",
            message : "User details required",
            data:{}
        });


}

    public async deleteUser(request: Request, response: Response) {
        if(request.query && request.query.id){
            try{
                 const userId = new Schema.Types.ObjectId(request.query.id?.toString());
                 await this.userService.deleteUser(userId);

                 response.status(200).json({
                    status: "Success",
                    message: "User deleted successfully",
                    data:{}
                 });
            }catch{
                response.status(500).json({
                    status:"Failed",
                    message: "Delete user from database failed",
                    data: {}
                });
            }
        response.status(422).json({
            status : "Failed",
            message : "User details deleted  failed",
            data:{}
        });

           

     
                    

    }

}
}