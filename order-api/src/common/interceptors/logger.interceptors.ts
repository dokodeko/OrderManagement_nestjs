import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req     = context.switchToHttp().getRequest<Request & { method: string; url: string }>();
    const method  = req.method;
    const url     = req.url;
    const now     = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const res      = context.switchToHttp().getResponse<{ statusCode: number }>();
          const status   = res.statusCode;
          const elapsed  = Date.now() - now;
          this.logger.log(`${method} ${url} ${status} +${elapsed}ms`);
        },
        error: (err) => {
          const status   = (err.status && typeof err.status === 'number') ? err.status : 500;
          const elapsed  = Date.now() - now;
          this.logger.error(
            `${method} ${url} ${status} +${elapsed}ms — ${err.message}`,
          );
        },
      }),
    );
  }
}
