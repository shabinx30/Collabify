import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { TRoles } from 'src/common/interfaces/user/role';
import { IGuser } from 'src/common/interfaces/user/user';
import { FastifyReply } from 'fastify';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(@Body('email') email: string) {
        return await this.userService.createUser(email);
    }

    @Post('signin')
    async signIn(
        @Body() data,
        @Res({ passthrough: true }) reply: FastifyReply,
    ) {
        const { refreshToken, accessToken, ...response } =
            await this.userService.signIn(data);

        reply.setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        reply.setCookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 15 * 60,
            path: '/',
        });

        return reply.send({ ...response, token: accessToken });
    }

    @Post('verify-otp')
    async verifyOtp(
        @Body() body,
        @Res({ passthrough: true }) reply: FastifyReply,
    ) {
        const { otp, ...userData } = body;
        const response = await this.userService.verifyOtp(userData, otp);

        const { accessToken, refreshToken, message } = response;

        // setting cookie if it success
        if (message !== 'success') {
            return message;
        }

        reply.setCookie('refreshToken', refreshToken as string, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        reply.setCookie('accessToken', accessToken as string, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 15 * 60,
            path: '/',
        });

        return reply.send({ message, token: accessToken });
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
        @Res({ passthrough: true }) reply: FastifyReply,
    ) {
        const { refreshToken, accessToken, message } =
            await this.userService.signInWithGoogle(userData, role);

        reply.setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        reply.setCookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 15 * 60,
            path: '/',
        });

        return reply.send({ message, token: accessToken });
    }

    @Post('logout')
    async logout(_, @Res({ passthrough: true }) reply: FastifyReply) {
        reply.clearCookie('refreshToken', {
            path: '/',
        });
        reply.clearCookie('accessToken', {
            path: '/',
        });

        return reply.send({ message: 'Logged out successfully' });
    }

    @Get('creators')
    async GetCreators(_, @Res({ passthrough: true }) reply: FastifyReply) {
        const creators = this.userService.searchCreators()
        return reply.send();
    }
}

@Controller('admin')
export class AdminUserController {
    constructor(private readonly userService: UserService) {}

    @Get('creators')
    async GetCreators(_, @Res({ passthrough: true }) reply: FastifyReply) {
        const data = await this.userService.getCreators();
        return reply.send(data);
    }

    @Get('brands')
    async GetBrands(_, @Res({ passthrough: true }) reply: FastifyReply) {
        const data = await this.userService.getBrands();
        return reply.send(data);
    }
}
