import { Body, Controller, Post, Request, UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { signupSchema } from "../validation/schemas/singup.schema";
import { JoiUsersValidationPipe } from "../validation/joi.users.validation.pipe";
import { SignupDto } from "../interfaces/dto/signup.dto";
import { MongooseExceptionFilter } from "src/filters/mongoose.exception.filter";
import { AuthGuard } from "@nestjs/passport";
import { signinSchema } from "src/validation/schemas/signin.schema";



@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UsePipes(new JoiUsersValidationPipe(signupSchema))
    @UseFilters(MongooseExceptionFilter)
    @Post('signup')
    public signup(@Body() body: SignupDto) {
        return this.usersService.singup(body);
    }

    
    @UsePipes(new JoiUsersValidationPipe(signinSchema))
    @UseGuards(AuthGuard('local'))
    @Post('signin')
    public signin(@Request() req) {
        return req.user._doc.email;
    }
}