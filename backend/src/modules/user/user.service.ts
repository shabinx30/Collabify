import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository.impl';
import { SignUpDto } from './dtos/signup.dto';
import { sign } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { SignInDto } from './dtos/signin.dto';
import generateOtp from 'src/common/utils/otp.util';
import { hashPassword, compare } from 'src/common/utils/hash.util';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(email): Promise<object> {
        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser?.isVerified) {
            throw new BadRequestException('User is already Existing');
        }

        try {
            await this.sendOtp(email);
            return { message: 'success' };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while signing up',
            );
        }
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
                userId: exist.id,
                username: exist.username,
                email: exist.email,
                role: exist.role,
            };

            const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15m',
            });

            const refreshToken = sign(
                { id: exist?.id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' },
            );

            return {
                message: 'success',
                accessToken,
                refreshToken,
                user: payload,
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
        const newOtp = await this.userRepository.createOtp({
            email,
            otp,
        });

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
                subject: 'Welcome to _',
                text: `Here is your joining otp(one time password): ${otp}`,
            });

            return newOtp.lastOtpSentAt;
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

    async resendOtp(email: string) {
        const PreviousOtp = await this.userRepository.findOtpByEmail(email);

        const now = new Date();
        const cooldownMs = 60 * 1000;

        if (
            PreviousOtp?.lastOtpSentAt &&
            now.getTime() - PreviousOtp.lastOtpSentAt.getTime() < cooldownMs
        ) {
            throw new BadRequestException('Please wait before resending OTP');
        }
        const otp = await generateOtp();
        const newOtp = await this.userRepository.createOrUpdateOtp(email, otp);

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
                subject: 'Welcome to _',
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
            const storedOtp = await this.userRepository.findOtpByEmail(
                userDto.email,
            );
            if (!storedOtp) {
                return { message: 'Could not find the otp' };
            }
            if (storedOtp.otp !== otp) {
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
                userId: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            };

            const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15m',
            });

            const refreshToken = sign(
                { id: newUser?.id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' },
            );

            return {
                message: 'success',
                accessToken,
                refreshToken,
                user: payload,
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
            const Otp = await this.userRepository.findOtpByEmail(email);
            if (Otp && Otp.lastOtpSentAt) {
                return { sendTime: Otp.lastOtpSentAt };
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
        const user = await this.userRepository.findByName(username)
        if(!user) {
            throw new NotFoundException("User not found")
        }
        return user
    }
}
