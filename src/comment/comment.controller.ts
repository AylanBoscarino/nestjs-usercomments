import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Headers, Req, Res } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { Payload } from 'src/payload.decorator';

@Controller('/api/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    getCommentList(): Promise<Comment[]> {
        return this.commentService.list();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createComment(@Body() comment, @Payload() payload): void {
        this.commentService.create(comment, payload);
     }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    getComment( @Param('id') id): Promise<Comment> {
        return this.commentService.find(id);
     }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    updateComment(@Param('id') id, @Body() data): Promise<UpdateResult> {
        return this.commentService.update(id, data);
     }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    removeComment(@Param('id') id): Promise<DeleteResult> {
        return this.commentService.remove(id);
     }
}
