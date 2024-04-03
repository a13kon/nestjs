import { CallHandler, ExecutionContext, Injectable, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import { Observable, catchError, throwError, tap } from "rxjs";


@Injectable()
export class LoggingInterception implements NestInterceptor {
    constructor() {}
    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        return next
            .handle()
            .pipe(
                tap( () => {
                    console.log({
                        status: 'success',
                        data: {
                            HandlerName: context.getHandler().name,
                            ClassName: context.getClass().name
                            }
                    })
                }),
                catchError(err => {
                    console.log({
                        status: "failed",
                        data: {
                            error: err
                        }
                    })
                    return throwError(new InternalServerErrorException())
                })
            )
    }
}