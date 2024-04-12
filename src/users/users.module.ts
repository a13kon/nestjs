import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../interfaces/schemas/users.schema";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule} from '@nestjs/config';





@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]), 
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '10m' },
          })
        
    ],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule {}