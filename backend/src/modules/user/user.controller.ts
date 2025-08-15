import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(@Body('email') email: string) {
        return await this.userService.createUser(email);
    }

    @Post('signin')
    async signIn(@Body() data, @Res({passthrough: true}) res: Response) {
        const { refreshToken, ...response } = await this.userService.signIn(data)
        
        // setting up cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return response
    }

    @Post('verify-otp')
    async verifyOtp(@Body() body, @Res({ passthrough: true }) res: Response) {
        const { otp, ...userData } = body;
        const response = await this.userService.verifyOtp(userData, otp);

        // setting cookie if it success
        if (response.message !== 'success') {
            return response.message;
        }

        const { accessToken, refreshToken, user } = response;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { token: accessToken, user };
    }

    @Post('resend-otp')
    async resendOtp(@Body('email') email: string) {
        return await this.userService.resendOtp(email);
    }

    @Post('otp-status')
    async getOtpStatus(@Body('email') email: string) {
        return await this.userService.otpStatus(email);
    }
}
