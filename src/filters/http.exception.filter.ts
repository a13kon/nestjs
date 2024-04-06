import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus() || 500;
        const data = exception.message;

        response
            .status(status)
            .json({
                timestamp: new Date().toISOString(),
                status: "fail",
                path: request.url,
                data: data,
                statusCode: status,
            });
    }
}