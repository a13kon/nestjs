import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";
import { Response } from "express";
import * as mongoose from 'mongoose'

@Catch( mongoose.mongo.MongoServerError)
export class MongooseExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const data = exception.message;

        const status = 
            exception instanceof HttpException
            ? exception.getStatus()
            : 409
        
        response
            .status(500)
            .json({
                message: data,
                error: "Already Exists",
                statusCode: status,
            });
    }
    }

