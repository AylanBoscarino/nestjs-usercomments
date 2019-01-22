import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('/api/comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    getCommentList(): Promise<Comment[]> {
        return this.commentService.list();
    }

    @Post()
    createComment(@Body() comment): void {
        this.commentService.create(comment);
     }

    @Get(':id')
    getComment( @Param('id') id ): Promise<Comment> {
        return this.commentService.find(id);
     }

    @Put(':id')
    updateComment(@Param('id') id, @Body() data): Promise<UpdateResult> {
        return this.commentService.update(id, data);
     }

    @Delete(':id')
    removeComment(@Param('id') id): Promise<DeleteResult> {
        return this.commentService.remove(id);
     }
}
