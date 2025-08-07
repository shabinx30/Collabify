import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignDto } from './dtos/signup.dto';
import { Response } from 'express';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(@Body() signDto: SignDto,@Res({ passthrough: true }) res: Response): Promise<Omit<IToken, "refreshToken">> {
        const { accessToken, refreshToken } =
            await this.userService.createUser(signDto);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { accessToken };
    }
}
