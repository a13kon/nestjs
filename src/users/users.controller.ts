import { Body, Controller, Post, UseFilters, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { signupSchema } from "./validation/schemas/singup.schema";
import { JoiUsersValidationPipe } from "./validation/joi.users.validation.pipe";
import { SignupDto } from "./interfaces/dto/signup.dto";
import { SigninDto } from "./interfaces/dto/signin.dto";
import { signinSchema } from "./validation/schemas/signin.schema";
import { MongooseExceptionFilter } from "src/filters/mongoose.exception.filter";


@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseFilters(MongooseExceptionFilter)
    @UsePipes(new JoiUsersValidationPipe(signupSchema))
    @Post('signup')
    public signup(@Body() body: SignupDto) {
        return this.usersService.singup(body);
    }

    @UsePipes(new JoiUsersValidationPipe(signinSchema))
    @Post('signin')
    public signin(@Body() body: SigninDto) {
        return this.usersService.signin(body);
    }
}