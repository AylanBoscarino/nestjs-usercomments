import { Controller, Post, Body, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/user-dto';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/login')
    @Header('Content-Type', 'application/json')
    signIn(@Body() body: UserDto): Promise<string> {
        return this.authService.signIn(body.email, body.senha);
    }
}
