import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { TRoles } from 'src/common/interfaces/user/role';
import { IGuser } from 'src/common/interfaces/user/user';
import { FastifyReply } from 'fastify';
import { ObjectId } from 'mongoose';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('user/:username')
    async findUser(@Param('username') username: string) {
        return await this.userService.getUser(username);
    }

    @Get('featured-creators')
    async GetCreators(_, @Res({ passthrough: true }) reply: FastifyReply) {
        const creators = await this.userService.searchFeaturedCreators();
        return reply.send(creators);
    }

    @Get('instagram-creators')
    async GetInstagramCreators(_, @Res({ passthrough: true }) reply: FastifyReply) {
        const creators = await this.userService.searchInstagramCreators();
        return reply.send(creators);
    }

    @Get('get-social-account')
    async GetSocial(
        @Query('userId') userId: unknown,
        @Res({ passthrough: true }) reply: FastifyReply,
    ) {
        const data = await this.userService.getSocialAccount(
            userId as ObjectId,
        );
        return reply.send(data);
    }
}

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('signup')
    async createUser(
        @Body('email') email: string,
        @Res({ passthrough: true }) reply: FastifyReply,
    ) {
        const res = await this.userService.createUser(email);
        return reply.send(res);
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
            sameSite: 'none', // ** switch to "lax" when hosted with same domain
            // domain: ".shabeensharih.online", ** enable this when hosted with domain
            secure: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        reply.setCookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'none', // ** switch to "lax" when hosted with same domain
            // domain: ".shabeensharih.online", ** enable this when hosted with domain
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
            sameSite: 'none', // ** switch to "lax" when hosted with same domain
            // domain: ".shabeensharih.online", ** enable this when hosted with domain
            secure: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        reply.setCookie('accessToken', accessToken as string, {
            httpOnly: true,
            sameSite: 'none', // ** switch to "lax" when hosted with same domain
            // domain: ".shabeensharih.online", ** enable this when hosted with domain
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
            sameSite: 'none', // ** switch to "lax" when hosted with same domain
            // domain: ".shabeensharih.online", ** enable this when hosted with same domain
            secure: true,
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        reply.setCookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'none', // ** switch to "lax" when hosted with same domain
            // domain: ".shabeensharih.online", ** enable this when hosted with domain
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
