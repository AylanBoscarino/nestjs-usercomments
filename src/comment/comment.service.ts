import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID, UpdateResult, DeleteResult } from 'typeorm';

import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async create(comment: Comment) {
        return await this.commentRepository.insert(comment);
    }

    async list(): Promise<Comment[]> {
        return await this.commentRepository.find({
            select: ['corpo', 'nomeAutor'],
            where: { ativo: true },
        });
    }

    async update(id: ObjectID, data: object): Promise<UpdateResult> {
        return await this.commentRepository.update(id, data);
    }

    async remove(id: ObjectID): Promise<DeleteResult> {
        return await this.commentRepository.update(id, { ativo: false });
    }

    async find(id: ObjectID): Promise<Comment> {
        return await this.commentRepository.findOne(
            id,
            {
                where: { ativo: true },
            },
        );
    }

}
