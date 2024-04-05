import { Controller, Get, Body, UseInterceptors, Param, ParseIntPipe, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterception } from './app.logging.interception';
import { AppAgeValidationPipe } from './app.ageValidationPipe.pipe';
import { RegisterDto } from './interfaces/dto/register.dto'
import { registerSchema } from './validation/schemas/register.schema';
import { JoiValidationPipe } from './validation/joi.validation.pipe';

//@UseInterceptors(LoggingInterception)
//@UsePipes(ParseIntPipe, AppAgeValidationPipe)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseInterceptors(LoggingInterception)
  @Get()
  getHello(): string {
    if (Math.random() > 0.75) {
      throw new Error ("error");
    }
    return this.appService.getHello();
  }

  @Get('age/:age') 
    getAgeInfo(@Param('age', ParseIntPipe, AppAgeValidationPipe) age: string): string {
      return age;
    }

  @UsePipes(new JoiValidationPipe(registerSchema))
  @Post('/register')
    register(@Body() body: RegisterDto) {
      return body;
    }  

}

