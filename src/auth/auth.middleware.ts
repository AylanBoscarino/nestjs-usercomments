import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
  ) {}
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];
      req.payload = this.jwtService.decode(token);
      return next();
    };
  }
}
