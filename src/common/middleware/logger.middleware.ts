// import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   private logger = new Logger('HTTP');

//   use(req: Request, res: Response, next: NextFunction): void {
//     const { method, originalUrl } = req;
//     const userAgent = req.get('user-agent') || '';

//     res.on('finish', () => {
//       const { statusCode } = res;
//       const contentLength = res.get('content-length');

//       this.logger.log(
//         `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent}`,
//       );
//     });

//     next();
//   }
// }

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    );
    next();
  }
}
