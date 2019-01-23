import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { create } from 'domain';

@Controller('/api/users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}
    @Get('/')
    index(): Promise<User[]> {
        return this.userService.index();
    }

    @Post('/')
    create(@Body() user): Promise<void> {
        return this.userService.create(user);
    }

}
