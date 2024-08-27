import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = process.env.API_KEY;
    const requestApiKey = req.header('x-api-key');

    if (!requestApiKey || requestApiKey !== apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}
