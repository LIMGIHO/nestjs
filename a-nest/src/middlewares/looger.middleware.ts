import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    try {
      const { ip, method, originalUrl } = req;
      const userAgent = req.get('user-agent') || '';

      res.on('finish', () => {
        const { statusCode } = res;
        const contentLength = res.get('content-length');
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      });
    } catch (error) {
      next(error);
    }

    next();
  }
}
