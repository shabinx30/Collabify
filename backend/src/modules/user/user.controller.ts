// src/user/user.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/signup.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    createUser(@Body() createUserDto: createUserDto): object {
        return this.userService.createUser(createUserDto);
    }
}
