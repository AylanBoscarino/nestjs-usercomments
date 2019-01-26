import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ObjectID } from 'mongodb';

import { Comment } from './comment.entity';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) {}

    async create(comment: Comment, payload: JwtPayload) {
        return await this.commentRepository.insert({
            corpo: comment.corpo,
            dataCriacao: Math.round(new Date().getTime() / 1000),
            autor: ObjectID(payload.id),
            nomeAutor: payload.nome,
            ativo: true,
        });
    }

    async list(): Promise<Comment[]> {
        return await this.commentRepository.find({
            select: ['corpo', 'nomeAutor', 'dataCriacao'],
            where: { ativo: true },
            order: {
                dataCriacao: 'DESC',
            },
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
