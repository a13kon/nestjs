import { Controller, Get, UseInterceptors, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterception } from './app.logging.interception';
//import { ValidationPipe } from './app.validation.pipe';
import { AppAgeValidationPipe } from './app.ageValidationPipe.pipe';

@UseInterceptors(LoggingInterception)
//@UsePipes(ValidationPipe)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}
