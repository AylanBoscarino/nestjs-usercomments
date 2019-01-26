import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment as CommentEntity } from './comment.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {
  // configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude({ path: '/api/comments', method: RequestMethod.GET })
    //   .forRoutes(CommentController);
  // }
}
