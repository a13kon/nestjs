import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request, Response } from "express";


@Injectable()
export class DailyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        //console.log(context);
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const date = new Date;
        if (date.getHours() < 12) {
            return true;
        }
        return false;
    }
}