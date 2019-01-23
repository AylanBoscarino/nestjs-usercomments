import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/user-dto';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/login')
    signIn(@Body() body: UserDto): Promise<string> {
        return this.authService.signIn(body.email, body.senha);
    }
}
