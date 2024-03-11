import { Module } from "@nestjs/common";
import { CatsController, CatsController2 } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
    controllers: [CatsController, CatsController2],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule {}