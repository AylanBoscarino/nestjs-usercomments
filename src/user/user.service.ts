import { Injectable, Res, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pbkdf2Sync, randomBytes } from 'crypto';

import { User } from './user.entity';
import { UserDto } from './user-dto';
import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(user: UserDto) {
        const salt: string = randomBytes(16).toString('hex');
        const hash: string = pbkdf2Sync(user.senha, salt, 100, 512, 'SHA256')
            .toString('hex');

        try {
            await this.userRepository.insert({
                nome: user.nome,
                email: user.email,
                salt,
                hash,
            });
        } catch (error) {
            throw new ConflictException();
        }
    }

    async index(): Promise<User[]> {
        return await this.userRepository.find({
            select: ['nome'],
        });
    }

    async getPayloadFromEmail(email: string): Promise<JwtPayload> {
        const user =  await this.userRepository.findOne(
            { email },
            { select: ['id', 'nome', 'email'] },
        );

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
        };
    }

    async verifyCredentials(email: string, password: string): Promise<boolean> {
        const user: User = await this.userRepository.findOne({ email });
        const newHash = pbkdf2Sync(password, user.salt, 100, 512, 'SHA256')
            .toString('hex');

        return newHash === user.hash;
    }
}
