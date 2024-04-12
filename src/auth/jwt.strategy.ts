import { ExtractJwt, Strategy } from 'passport-jwt';
//import { Strategy } from "passport-local";
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import { ConfigService } from '@nestjs/config';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }
    
    public async validate(payload: any) {

        const user = await this.authService.validateUserById(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}