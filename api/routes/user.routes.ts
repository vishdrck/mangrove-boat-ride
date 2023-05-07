import { Application,Request,Response, request } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRoutes{

    private userController: UserController = new UserController();

    public route(app:Application){
        app.get("/user",(request:Request,response:Response)=>{
          this.userController.getUser(request,response);
        });
        app.post("/user",(request:Request,response:Response)=>{
            this.userController.createUser(request,response);
        });
        app.get("/user/{id}",(request:Request,response:Response)=>{
            this.userController.getAllUsers(request,response);
        });
        app.delete("/user/{id}",(request:Request,response:Response)=>{
            this.userController.deleteUser(request,response);
        });
        app.put("/user/{id}",(request:Request,response:Response)=>{
            this.userController.updateUser(request,response);
        });
    }

}