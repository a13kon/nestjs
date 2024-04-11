import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";



@Controller('api/users')
export class UsersController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService ) {}

    //@UsePipes(new JoiUsersValidationPipe(signinSchema))
    //@UseGuards(AuthGuard('local'))
    @UseGuards(JwtAuthGuard)
    @Post('signin')
    public signin(@Request() req) {
        return req.user._doc.email;
    }
    

}
