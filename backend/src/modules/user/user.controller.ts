import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/signup.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(@Body() createUserDto: createUserDto): Promise<object> {
        const newUser = await this.userService.createUser(createUserDto);
        console.log(newUser)
        return {
            message: 'success',
            user: newUser,
        };
    }
}
