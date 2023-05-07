import { Schema } from "mongoose";
import { IUser } from "../entity/user.entity";
import userSchema from "../schemas/user.schema"

// Interact with the database
export class UserService{
    public createUser(userParams: IUser): Promise<any> {
        const user = new userSchema(userParams);
        return user.save();
      }
    
      public editUser(id: Schema.Types.ObjectId, userParams: IUser): Promise<any> {
        return userSchema.findOneAndUpdate({ _id: id }, userParams).exec();
      }
    
      public deleteUser(id: Schema.Types.ObjectId): Promise<any> {
        return userSchema.findOneAndUpdate({ _id: id }, { isDeleted: true }).exec();
      }
    
      public restoreUser(id: Schema.Types.ObjectId): Promise<any> {
        return userSchema.findOneAndUpdate({ _id: id }, { isDeleted: false }).exec();
      }
    
      public filterUsers(filters: any): Promise<any> {
        return userSchema.find(filters).exec();
      }

}