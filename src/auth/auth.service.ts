import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync, randomBytes } from 'crypto';

import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
    protected secret = 'my-new-secret';

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(email: string, password: string): Promise<string> {
        if (await this.userService.verifyCredentials(email, password)) {
            return this.jwtService.sign(
                await this.userService.getPayloadFromEmail(email),
            );
        }
        throw new UnauthorizedException();
    }

    generateCredentials(password: string): object {
        const salt = randomBytes(16).toString('hex');
        const hash = pbkdf2Sync(password, salt, 100, 256, 'sha256').toString('hex');
        return { salt, hash };
    }

    async validateUser(payload: JwtPayload): Promise<JwtPayload> {
        const user = await this.userService.getPayloadFromEmail(payload.email);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

    // TODO: criar um serviço para gerar hash de usuário.
    // TODO: terminar de implementar o sistema de autenticação

}
