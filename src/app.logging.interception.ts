import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class LoggingInterception implements NestInterceptor {
    constructor() {}
    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log("New request!", {
            HandlerName: context.getHandler().name,
            ClassName: context.getClass().name
        });
        return next
            .handle()
    }
}