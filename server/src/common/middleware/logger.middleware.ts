import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      // eslint-disable-next-line no-console
      console.log(
        `[${new Date().toISOString()}] ${method} ${originalUrl} -> ${status} (${duration}ms)`,
      );
    });

    next();
  }
}
