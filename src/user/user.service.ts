import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pbkdf2Sync, randomBytes } from 'crypto';

import { User } from './user.entity';
import { UserDto } from './user-dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(user: UserDto) {
        const salt: string = randomBytes(16).toString('hex');
        const hash: string = pbkdf2Sync(user.senha, salt, 100, 512, 'SHA256').toString('hex');
        await this.userRepository.insert({
            nome: user.nome,
            email: user.email,
            salt,
            hash,
        });
    }

    async index(): Promise<User[]> {
        return await this.userRepository.find({
            select: ['nome'],
        });
    }
}
