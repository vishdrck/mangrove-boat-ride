import express from "express";
import cors from "cors";
import bearerToken from "express-bearer-token";
import { CommonRoutes } from "../routes/common.route";
import { UserRoutes } from "../routes/user.routes";
import { MongoConnection } from "./mongo";
import { BoatRoutes } from "../routes/boat.routes";

class App{
    public app: express.Application;
    private mongoConnection: MongoConnection = new MongoConnection();
    private commonRoutes: CommonRoutes = new CommonRoutes();
    private userRoutes: UserRoutes = new UserRoutes();
    private boatRoutes:BoatRoutes = new BoatRoutes();

    constructor(){
        this.app = express();
        this.config();
        this.mongoConnection.connect();
        this.commonRoutes.route(this.app);
        this.userRoutes.route(this.app);
        this.boatRoutes.route(this.app);
    }

    private config(): void{
        this.app.use(cors({
            origin: "*",
            methods: "GET,HEAD,PUT,POST,PATCH,DELETE",
            preflightContinue: true,
            optionsSuccessStatus: 204
        }));

        this.app.use(express.json());

        this.app.use(express.urlencoded({
            extended: true
        }));

        this.app.use(bearerToken());

        this.app.use((req,res,next)=>{
            res.setHeader('Access-Control-Allow-Origin', "*");
            res.setHeader('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,OPTIONS,DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow_Credentials', 'true');
            if(req.url.substring(0,4)=="/api"){
                req.url= req.url.substring(4);
            }
            next();
        });

    }
}

export default new App().app;