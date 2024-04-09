import { Injectable } from "@nestjs/common";
import { SignupDto } from "../interfaces/dto/signup.dto";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../interfaces/schemas/users.schema";
import { Connection, Model } from "mongoose";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        @InjectConnection() private connection: Connection,
    ) {}


    singup(data: SignupDto): Promise<UserDocument> {
        const user = new this.UserModel(data);

        return user.save();
    }

    async findOne(username: string): Promise<UserDocument> {
        return this.UserModel.findOne(
            { email: username }
        )
    }
    
}