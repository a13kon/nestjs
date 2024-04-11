import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../interfaces/schemas/users.schema";
import { JwtModule } from '@nestjs/jwt';




@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]), 
        JwtModule.register({
            secret: '1',
            signOptions: { expiresIn: '60s' },
          })
        
    ],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})
export class UsersModule {}