import {
    BadRequestException,
    HttpException,
    Inject,
    Injectable,
} from '@nestjs/common';
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository.impl';
import { SignUpDto } from './dtos/signup.dto';
import { createTransport } from 'nodemailer';
import { SignInDto } from './dtos/signin.dto';
import generateOtp from 'src/common/utils/otp.util';
import { hashPassword, compare } from 'src/common/utils/hash.util';
import { JwtService } from '@nestjs/jwt';
import { TRoles } from 'src/common/interfaces/user/role';
import { UserDocument } from './schemas/user.schema';
import { IGuser } from 'src/common/interfaces/user/user';
import axios from 'axios';
import { ObjectId } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        @Inject('ACCESS_JWT') private readonly accessJwt: JwtService,
        @Inject('REFRESH_JWT') private readonly refreshJwt: JwtService,
        @Inject('REDIS_CLIENT') private readonly redisService,
    ) {}

    async createUser(email: string): Promise<object> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser?.isVerified) {
            throw new BadRequestException('User is already Existing');
        }

        await this.sendOtp(email);
        return { message: 'success' };
    }

    async signIn(userDto: SignInDto) {
        const exist = await this.userRepository.findByEmail(userDto.email);
        if (!exist) {
            throw new NotFoundException('User not found');
        }

        if (await compare(userDto.password, exist.password)) {
            throw new BadRequestException('Email or Password is not matching');
        }

        try {
            const payload = {
                userId: exist._id,
                username: exist.username,
                profile: exist.profile,
                email: exist.email,
                role: exist.role,
                isVerified: true,
            };

            const accessToken = await this.accessJwt.signAsync(payload);

            const refreshToken = await this.refreshJwt.signAsync({
                userId: exist._id,
            });

            return {
                message: 'success',
                accessToken,
                refreshToken,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.log(error, 'Error while signing in.');
            throw new InternalServerErrorException(
                'An unexpected error occurred while signing in',
            );
        }
    }

    async sendOtp(email: string) {
        const otp = generateOtp();

        console.log({ email, otp });
        const status = await this.redisService.set(
            `otp:${email}`,
            JSON.stringify({ otp, lastOtpSentAt: Date.now() }),
            300,
        );

        if (!status) {
            throw new InternalServerErrorException("Can't create otp");
        }

        // it's not working on render ******************************************

        // try {
        //     const transport = createTransport({
        //         service: 'gmail',
        //         auth: {
        //             user: process.env.USER,
        //             pass: process.env.PASS,
        //         },
        //     });

        //     await transport.sendMail({
        //         from: process.env.USER,
        //         to: email,
        //         subject: 'Welcome to Collabify',
        //         text: `Here is your joining otp(one time password): ${otp}`,
        //     });

        //     return newOtp.lastOtpSentAt;
        // } catch (error) {
        //     if (error instanceof HttpException) {
        //         throw error;
        //     }
        //     console.error('Error from sendOtp', error);
        //     throw new InternalServerErrorException(
        //         'An unexpected error occurred while sending otp',
        //     );
        // }
    }

    async resendOtp(email: string) {
        const PreviousOtp = await this.redisService.get(`otp:${email}`);

        const parsedOtp = JSON.parse(PreviousOtp);

        const now = new Date();
        const cooldownMs = 60 * 1000;

        if (
            parsedOtp?.lastOtpSentAt &&
            now.getTime() - new Date(parsedOtp.lastOtpSentAt).getTime() < cooldownMs
        ) {
            throw new BadRequestException('Please wait before resending OTP');
        }
        const otp = generateOtp();
        console.log({ email, otp });
        const newOtp = await this.redisService.set(
            `otp:${email}`,
            JSON.stringify({ otp, lastOtpSentAt: Date.now() }),
            300,
        );

        if (!newOtp) {
            throw new InternalServerErrorException("Can't create otp");
        }
        try {
            const transport = createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS,
                },
            });

            await transport.sendMail({
                from: process.env.USER,
                to: email,
                subject: 'Welcome to Collabify',
                text: `Here is your joining otp(one time password): ${otp}`,
            });

            return { message: 'success', sendTime: newOtp.lastOtpSentAt };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.error('Error from sendOtp', error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while sending otp',
            );
        }
    }

    async verifyOtp(userDto: SignUpDto, otp: number) {
        try {
            const storedOtp = await this.redisService.get(
                `otp:${userDto.email}`,
            );
            if (!storedOtp) {
                return { message: 'Could not find the otp' };
            }
            if (JSON.parse(storedOtp).otp !== otp) {
                return { message: 'not matching' };
            }

            const { password, ...userData } = userDto;
            const hashedPassword = await hashPassword(password);

            const newUser = await this.userRepository.createUser({
                ...userData,
                password: hashedPassword,
                isVerified: true,
            });

            const payload = {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                isVerified: true,
            };

            const accessToken = await this.accessJwt.signAsync(payload);

            const refreshToken = await this.refreshJwt.signAsync({
                userId: newUser._id,
            });

            return {
                message: 'success',
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while verifying otp',
            );
        }
    }

    async otpStatus(email: string) {
        try {
            const Otp = await this.redisService.get(`otp:${email}`);
            const parsedOtp = JSON.parse(Otp);
            if (parsedOtp && parsedOtp.lastOtpSentAt) {
                return { sendTime: parsedOtp.lastOtpSentAt };
            }
            return { exist: false };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while grabbing otp status',
            );
        }
    }

    async getUser(username: string) {
        const user = await this.userRepository.findByName(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async signInWithGoogle(userData: IGuser, role: TRoles) {
        try {
            const { given_name, email, picture } = userData;

            const exist = await this.userRepository.findByEmail(email);
            let user: UserDocument | null = null;

            if (exist) {
                user = await this.userRepository.upsertUser({
                    _id: exist._id,
                    username: given_name,
                    profile: picture,
                });
            } else {
                user = await this.userRepository.createUser({
                    username: given_name,
                    email,
                    profile: picture,
                    role,
                    isVerified: true,
                });
            }

            const accessToken = await this.accessJwt.signAsync({
                userId: exist ? exist._id : user?._id,
                username: exist ? exist.username : given_name,
                profile: exist ? exist.profile : picture,
                email,
                role: exist ? exist.role : role,
                isVerified: true,
            });

            const refreshToken = await this.refreshJwt.signAsync({
                userId: exist ? exist._id : user?._id,
            });

            return {
                message: 'success',
                accessToken,
                refreshToken,
            };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while logining with google',
            );
        }
    }

    async getCreators() {
        try {
            return await this.userRepository.findCreators();
        } catch (error) {
            throw new InternalServerErrorException(
                'An unexpected error has been occured while find the creators',
            );
        }
    }

    async getBrands() {
        try {
            return await this.userRepository.findBrands();
        } catch (error) {
            throw new InternalServerErrorException(
                'An unexpected error has been occured while find the brands',
            );
        }
    }

    async searchCreators() {
        try {
            return await this.userRepository.searchCreators();
        } catch (error) {
            throw new InternalServerErrorException(
                'An unexpected error has been occured while searching creators',
            );
        }
    }

    async getSocialAccount(userId: ObjectId) {
        const socialData = await this.userRepository.getSocialAccount(userId);
        if (!socialData) {
            return null;
        }
        const cacheKey = `socialAccount:${userId}`;
        const cachedData = await this.redisService.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
        try {
            const res = await axios.get(
                `https://graph.instagram.com/v19.0/${socialData.platformUserId}?fields=id,username,account_type,biography,website,profile_picture_url,followers_count,follows_count,media_count,media.limit(10){id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count}&access_token=${socialData.token.accessToken}`,
            );
            await this.redisService.set(cacheKey, JSON.stringify(res.data));
            return res.data;
        } catch (error) {
            throw new InternalServerErrorException(
                'An unexpected error has been occured while getting social account',
            );
        }
    }
}
