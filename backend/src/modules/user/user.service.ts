import { BadRequestException, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository.impl';
import { SignDto } from './dtos/signup.dto';
import { sign } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(email): Promise<object> {
        try {
            const existingUser = await this.userRepository.findByEmail(email);

            if (existingUser?.isVerified) {
                throw new BadRequestException('User is already Existing');
            }

            await this.sendOtp(email);
            return { message: 'success' };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while signing up',
            );
        }
    }

    async generateOtp() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    async sendOtp(email: string): Promise<string> {
        try {
            const otp = await this.generateOtp();
            const newOtp = await this.userRepository.createOtp({
                email,
                otp,
            });

            if (!newOtp) {
                throw new InternalServerErrorException("Can't create otp");
            }

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

            return 'success';
        } catch (error) {
            console.error('Error from sendOtp', error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while sending otp',
            );
        }
    }

    async resendOtp(email: string) {
        try {
            const PreviousOtp = await this.userRepository.findOtpByEmail(email);

            const now = new Date();
            const cooldownMs = 60 * 1000;

            if (
                PreviousOtp?.lastOtpSentAt &&
                now.getTime() - PreviousOtp.lastOtpSentAt.getTime() < cooldownMs
            ) {
                throw new BadRequestException(
                    'Please wait before resending OTP',
                );
            }

            const otp = await this.generateOtp();
            const newOtp = await this.userRepository.createOrUpdateOtp(
                email,
                otp,
            );

            if (!newOtp) {
                throw new InternalServerErrorException("Can't create otp");
            }

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

            return 'success';
        } catch (error) {
            console.error('Error from sendOtp', error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while sending otp',
            );
        }
    }

    async verifyOtp(userDto: SignDto, otp: number) {
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

            const newUser = await this.userRepository.createUser(userDto)

            const accessToken = sign(newUser, {
                secret: process.env.ACCESS_TOKEN_SECRET,
                expiresIn: '15m',
            });

            const refreshToken = sign(newUser?.id, {
                secret: process.env.ACCESS_TOKEN_SECRET,
                expiresIn: '7d',
            });

            return { message: 'success', accessToken, refreshToken };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while creating User',
            );
        }
    }
}
