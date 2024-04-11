import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../interfaces/schemas/users.schema";
import { JwtModule } from '@nestjs/jwt';
import { jwtSecretKey } from "src/constants";




@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]), 
        JwtModule.register({
            secret: jwtSecretKey,
            signOptions: { expiresIn: '10m' },
          })
        
    ],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule {}