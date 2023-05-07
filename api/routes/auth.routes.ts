import { Application,Request,Response, request } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {

    private authController: AuthController = new AuthController();

    public route(app:Application){
        app.post("/login",(request:Request,response:Response)=>{
          this.authController.login(request, response);
        });
        app.post("/register",(request:Request,response:Response)=>{
            this.authController.register(request,response);
        });
        
    }

}