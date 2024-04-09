import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class MongooseExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const data = exception.message;

        const status = 
            exception instanceof HttpException
            ? exception.getStatus()
            : 409
        
        response
            .status(500)
            .json({
                timestamp: new Date().toISOString(),
                status: "fail",
                path: request.url,
                data: data,
                statusCode: status,
            });
    }
    }

