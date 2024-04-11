import { Body, Controller, Post, UseFilters, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { signupSchema } from "../validation/schemas/singup.schema";
import { JoiUsersValidationPipe } from "../validation/joi.users.validation.pipe";
import { SignupDto } from "../interfaces/dto/signup.dto";
import { MongooseExceptionFilter } from "src/filters/mongoose.exception.filter";




@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UsePipes(new JoiUsersValidationPipe(signupSchema))
    @UseFilters(MongooseExceptionFilter)
    @Post('signup')
    public signup(@Body() body: SignupDto) {
        return this.usersService.singup(body);
    }
    

}