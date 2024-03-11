import { Controller, Get } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Sphynx } from "./data/sphynx";

@Controller('cats') 
export class CatsController {
    constructor(private readonly catsService: CatsService) {};

    @Get()
    findAll() {
        const cat = new Sphynx;
        this.catsService.create(cat);
        return this.catsService.findAll();
    }

}

@Controller('catss') 
export class CatsController2 {
    constructor(private readonly catsService: CatsService) {};

    @Get()
    catsss() {
        return 'catss';
    }

}