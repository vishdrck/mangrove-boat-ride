import {IAuth} from "../entity/auth.entity";
import auth from '../schema/auth.schema';
import mongoose, { Schema } from "mongoose";

export class AuthService {
  public createAuth(authParams: IAuth): Promise<any> {
    const _auth = new auth(authParams);
    return _auth.save();
  }

  public updateAuth(id: Schema.Types.ObjectId, authParams: IAuth): Promise<any> {
    return auth.findOneAndUpdate({ _id: id }, authParams);
  }

  public deleteAuth(id: Schema.Types.ObjectId): Promise<any> {
    return auth.findOneAndUpdate({_id: id}, {isDeleted: true});
  }

  public restoreAuth(id: Schema.Types.ObjectId): Promise<any> {
    return auth.findOneAndUpdate({_d: id}, {isDeleted: false});
  }

  public filterAuth(filters: any): Promise<any> {
    return auth.find(filters);
  }
}