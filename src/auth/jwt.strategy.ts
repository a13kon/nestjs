import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import { jwtSecretKey } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecretKey,
        });
    }

    public async validate(payload: any) {
        const user = await this.authService.validateUserById(payload.id);
        console.log(user, payload.id)
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}