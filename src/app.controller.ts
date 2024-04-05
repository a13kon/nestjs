import { Controller, Get, Body, UseInterceptors, Param, ParseIntPipe, Post, UsePipes, HttpException, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterception } from './app.logging.interception';
import { AppAgeValidationPipe } from './app.ageValidationPipe.pipe';
import { RegisterDto } from './interfaces/dto/register.dto'
import { registerSchema } from './validation/schemas/register.schema';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { LoginDto } from './interfaces/dto/login.dto';
import { ClValidationPipe } from './validation/cl.validation';
import { HttpExceptionFilter } from './filters/http.exception.filter';

//@UseInterceptors(LoggingInterception)
//@UsePipes(ParseIntPipe, AppAgeValidationPipe)
@UseFilters(HttpExceptionFilter)
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

  @Get('/error')
  getError(): string {
    throw new HttpException('Error!', 401);

    return 'error';
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


  @UsePipes(new ClValidationPipe())
  @Post('/login')
  login(@Body() body: LoginDto){
    return body;
  }

}

