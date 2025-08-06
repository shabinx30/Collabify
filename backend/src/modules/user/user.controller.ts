import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/signup.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    createUser(@Body() createUserDto: createUserDto): object {
        const newUser = this.userService.createUser(createUserDto);
        return {
            message: 'success',
            newUser,
        };
    }
}
