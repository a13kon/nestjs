import { Controller, Post, Body, UseGuards, Get } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { SigninDto } from "src/interfaces/dto/signin.dto";


@Controller('api/users')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService ) {}

    //@UsePipes(new JoiUsersValidationPipe(signinSchema))
    //@UseGuards(AuthGuard('local'))
    //@UseGuards(JwtAuthGuard)
    @Post('signin')
    public signin(@Body() body: SigninDto) {
        return this.usersService.signin(body)
    }

    @UseGuards(JwtAuthGuard)
    @Get('signin')
    getToken(): string {
        return 'success!!!'
    }

}
