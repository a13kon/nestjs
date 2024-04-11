import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SignupDto } from "../interfaces/dto/signup.dto";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../interfaces/schemas/users.schema";
import { Connection, Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from "src/interfaces/dto/signin.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>,
        @InjectConnection() private connection: Connection,
        private jwtService: JwtService
    ) {}


    singup(data: SignupDto): Promise<UserDocument> {
        const user = new this.UserModel(data);

        return user.save();
    }

    async signin(data: SigninDto) {
        const user = await this.UserModel.findOne(
            {email:data.email}
        )
        if (user && user.password == data.password) {
            const { _id } = user._id;
            const token = this.jwtService.sign({id: user._id});
            console.log(_id, token)
            return token
        }
        else
        {
            throw new UnauthorizedException('Vrong data!');
        }
        
        
    }

    async findOne(username: string): Promise<UserDocument> {
        return this.UserModel.findOne(
            { email: username }
        )
    }

    async validateUser(id: number): Promise<any> {
        const user = await this.UserModel.findById(id);
        if (user) {
            return user;
        }
        return null;
    }

    createToken(payload: any) {
        return this.jwtService.sign(payload);
    }
    
}