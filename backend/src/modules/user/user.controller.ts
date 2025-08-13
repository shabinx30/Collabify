import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(@Body() body) {
        return await this.userService.createUser(body.email);
    }

    @Post('verify-otp')
    async verfyOtp(@Body() body, @Res({ passthrough: true }) res: Response) {
        const {otp, ...user} = body
        const response = await this.userService.verifyOtp(user, otp);

        // setting cookie if it success
        if (response.message !== 'success') {
            return response.message;
        }

        const { accessToken, refreshToken } = response;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { accessToken };
    }
}
