import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthMiddleware } from './auth.middleware';
import { CommentController } from 'src/comment/comment.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'my-new-secret',
      signOptions: {
        expiresIn: 846000,
      },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .exclude({ path: '/api/comments', method: RequestMethod.GET })
        .forRoutes(CommentController);
    }
}
