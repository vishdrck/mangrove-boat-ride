import { AuthService } from "../modules/auth/services/auth.service";
import { Request, Response } from "express";
import queryBuilderHelper from "../helpers/query-builder.helper";
import { UserService } from "../modules/user/services/user.service";
import sha1 from 'sha1';
import { IAuth, ILoginUser } from "../modules/auth/entity/auth.entity";
import { IUser } from "../modules/user/entity/user.entity";
import generateUUID from "smc-uuid-generator";

export class AuthController {
  private authService: AuthService = new AuthService();
  private userService: UserService = new UserService();

  public login(req: Request, res: Response) {
    console.log(req.body);
    if (req?.body?.email && req?.body?.password) {
      if (req?.body?.email) {
        req.body.email = req.body.email.toLowerCase();
      }

      let filter: any = {};
      filter = queryBuilderHelper.valueMatcher(filter, 'isDeleted', false);
      filter = queryBuilderHelper.valueMatcher(filter, 'email', req?.body?.email);

      this.userService.filterUsers(filter).then((dataUser: ILoginUser[]) => {

        if (dataUser && dataUser.length && dataUser.length === 1) {
            if (sha1(req.body.password) === dataUser[0].password) {
              const token = generateUUID();
              const newAuthToken: IAuth = {
                _id: dataUser[0]._id,
                token: token,
                expiryDate: this.createExpiryDate()
              };
              // console.log(newAuthToken);
              this.authService.updateAuth(dataUser[0]._id, newAuthToken).then(() => {
                    res.status(200).json({
                        status: "Success",
                        message: "Data fetched successfully",
                        data: {
                            _id: dataUser[0]._id,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            username: req.body.username,
                            token: token
                        }
                    });
              }).catch(error => {
                res.status(500).json({
                    status: "Fail",
                    message: "Something Went Wrong",
                    data: {}
                });
              });
            }
        } else {
          res.status(200).json({
            status: "Success",
            message: "Invalid Credentials",
            data: {}
        });
        }
      });
    } else {
        res.status(422).json({
            status: "Fail",
            message: "Insufficient Data",
            data: {}
        });
    }
  }

  public register(req: Request, res: Response) {
    if (req && req.body && req.body.firstName && req.body.lastName && req.body.email && req.body.password) {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }

      let filter: any = {};
      filter = queryBuilderHelper.valueMatcher(filter, 'isDeleted', false);
      filter = queryBuilderHelper.valueMatcher(filter, 'email', req.body.email);

      this.userService.filterUsers(filter).then((dataUsers: ILoginUser[]) => {

          if (dataUsers && dataUsers.length && dataUsers.length > 0) {
            res.status(200).json({
                status: "Success",
                message: "User already exist",
                data: {}
            });
          } else {
            const newUserParams: IUser = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: sha1(req.body.password)
            };

            this.userService.createUser(newUserParams).then((addedUser: ILoginUser) => {
                const token = generateUUID();
                const newAuthToken: IAuth = {
                  _id: addedUser._id,
                  token: token,
                  expiryDate: this.createExpiryDate()
                };

                this.authService.createAuth(newAuthToken).then(() => {
                    res.status(200).json({
                        status: "Success",
                        message: "User created successfully",
                        data: {
                            _id: addedUser._id,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            username: req.body.username,
                            token: token
                        }
                    });
                  
                });
              
            });
          }
      });
    } else {
        res.status(422).json({
            status: "Fail",
            message: "Insufficient Data",
            data: {}
        });
    }
  }

  private createExpiryDate(): Date {
    let date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }

  public validateToken(req: Request, res: Response) {
    if (req && req.body && req.body.token) {
      this.authService.filterAuth({ token: req.body.token }).then((dataAuth: IAuth[]) => {
          if (dataAuth && dataAuth.length && dataAuth.length === 1) {
            if (dataAuth[0].token) {
              const today = new Date(Date.now());
              let expDate = new Date(dataAuth[0].expiryDate);
              if (today.getTime() < expDate.getTime()) {
                expDate.setDate(today.getDate() + 3);
                this.authService.updateAuth(dataAuth[0]._id, { _id: dataAuth[0]._id, expiryDate: expDate, token: dataAuth[0].token }).then( () => {
                    res.status(200).json({
                        status: "Success",
                        message: "Token validated successfully",
                        data: {
                            validity: true
                        }
                    });           
                });
              } else {
                res.status(200).json({
                    status: "Success",
                    message: "Token validation failed",
                    data: {
                        validity: false
                    }
                });      
              }
            } else {
                res.status(200).json({
                    status: "Success",
                    message: "Token not found",
                    data: {
                        validity: false
                    }
                });
            }
          } else {
            res.status(200).json({
                status: "Success",
                message: "Token not found",
                data: {
                    validity: false
                }
            });
          }
        
      });
    } else {
        res.status(422).json({
            status: "Fail",
            message: "Insufficient Data",
            data: {}
        });
    }
  }
}
