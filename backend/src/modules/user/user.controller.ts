import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignDto } from './dtos/signup.dto';
import { Response } from 'express';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(@Body() signDto: SignDto) {
        return await this.userService.createUser(signDto);
    }

    // re-validate the logic
    @Post('verify-otp')
    async verfyOtp(@Body() body, @Res({passthrough: true}) res: Response) {
        const { accessToken, refreshToken } = await this.userService.verfyOtp(body)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { accessToken };
    }
}
