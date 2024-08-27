// import {
//   Injectable,
//   NestMiddleware,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class JwtMiddleware implements NestMiddleware {
//   constructor(private readonly jwtService: JwtService) {}

//   use(req: Request, res: Response, next: NextFunction) {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       throw new UnauthorizedException('Token not provided');
//     }

//     const [bearer, token] = authHeader.split(' ');

//     if (bearer !== 'Bearer' || !token) {
//       throw new UnauthorizedException('Invalid token');
//     }

//     try {
//       const decoded = this.jwtService.verify(token, {
//         secret: process.env.SECRET_KEY,
//       });
//       req['user'] = decoded; // Save decoded token to request object
//       next();
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }
//   }
// }

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './res_users.entity';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log('Token not provided');
      throw new UnauthorizedException('Token not provided');
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      console.log('Invalid token format');
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      // console.log('Received token:', token);

      const decoded = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      // console.log('Decoded token:', decoded);

      req['user'] = decoded;

      // Cari user berdasarkan ID yang di-decode dari token
      const user = await this.userRepository.findOne({
        where: { id: decoded.id }, // Menggunakan id dari token
      });

      // console.log('User found:', user);

      if (!user || !user.jwt_token_expiration) {
        console.log('User not found or token expiration missing');
        throw new UnauthorizedException(
          'User not found or token expiration missing',
        );
      }

      const now = new Date();
      // console.log('Current time:', now);
      // console.log('Token expiration:', user.jwt_token_expiration);

      if (now > user.jwt_token_expiration) {
        console.log('Token expired');
        throw new UnauthorizedException('Token expired');
      }

      next();
    } catch (error) {
      console.error('Error during token validation:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
