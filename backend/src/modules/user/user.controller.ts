import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { TRoles } from 'src/common/interfaces/user/role';
import { IGuser } from 'src/common/interfaces/user/user';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(@Body('email') email: string) {
        return await this.userService.createUser(email);
    }

    @Post('signin')
    async signIn(@Body() data, @Res({ passthrough: true }) res: Response) {
        const { refreshToken, accessToken, ...response } =
            await this.userService.signIn(data);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 15 * 60 * 1000, // 15 min
            path: '/',
        });

        return { ...response, token: accessToken };
    }

    @Post('verify-otp')
    async verifyOtp(@Body() body, @Res({ passthrough: true }) res: Response) {
        const { otp, ...userData } = body;
        const response = await this.userService.verifyOtp(userData, otp);

        const { accessToken, refreshToken, message } = response;

        // setting cookie if it success
        if (message !== 'success') {
            return message;
        }

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 15 * 60 * 1000, // 15 min
            path: '/',
        });

        return { message, token: accessToken };
    }

    @Post('resend-otp')
    async resendOtp(@Body('email') email: string) {
        return await this.userService.resendOtp(email);
    }

    @Post('otp-status')
    async getOtpStatus(@Body('email') email: string) {
        return await this.userService.otpStatus(email);
    }

    @Get('user/:username')
    async findUser(@Param('username') username: string) {
        return await this.userService.getUser(username);
    }

    @Post('sign-in-google')
    async signInWithGoogle(
        @Body('userData') userData: IGuser,
        @Body('role') role: TRoles,
        @Res() res: Response
    ) {
        const { refreshToken, accessToken, message } =
            await this.userService.signInWithGoogle(userData, role);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 15 * 60 * 1000,
            path: '/'
        })

        return res.json({ token: accessToken, message })
    }
}
