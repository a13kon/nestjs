import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async validateUser(username: string, pass: string): Promise<any> {
      
        const user = await this.userService.findOne(username);

        if (user && user.password === pass) {
            
            const { ...result } = user;
            return result;
        }
        return null;

        
 }
 
 async validateUserById(id: string): Promise<any> {
      
    const user = await this.userService.findOne(id);

    if (user) {
        
        const { ...result } = user;
        return result;
    }
    return null;
}
}