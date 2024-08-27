// import {
//   Injectable,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtService } from '@nestjs/jwt';
// import { User } from './res_users.entity';

// @Injectable()
// export class JwtAuthGuard extends AuthGuard('jwt') {
//   constructor(private readonly jwtService: JwtService) {
//     super();
//   }

//   canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization?.split(' ')[1];

//     if (!token) {
//       throw new UnauthorizedException('No token provided');
//     }

//     try {
//       const decoded = this.jwtService.verify(token, {
//         secret: process.env.SECRET_KEY,
//       });
//       request.user = decoded;
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }
//   }
// }

import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './res_users.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log('No token provided');
      throw new UnauthorizedException('No token provided');
    }

    try {
      // console.log('Received token:', token);

      const decoded = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      // console.log('Decoded token:', decoded);

      request.user = decoded;

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

      return true;
    } catch (error) {
      console.error('Error during token validation:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
