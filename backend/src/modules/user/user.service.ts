import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository.impl';
import { SignDto } from './dtos/signup.dto';
import { sign } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private sign: sign,
        private createTransport: createTransport,
    ) {}

    async createUser(body: SignDto): Promise<object> {
        const existingUser = await this.userRepository.findByEmail(body.email);

        if (existingUser?.isVerified) {
            throw new BadRequestException('User is already Existing');
        }
        try {
            const newUser = await this.userRepository.createUser(body);

            await this.sendOtp(newUser.email);
            return { message: 'success' };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while creating User',
            );
        }
    }

    async generateOtp() {
        return Math.round(Math.random() * 10_000);
    }

    async sendOtp(email: string): Promise<string> {
        try {
            const otp = await this.userRepository.createOtp({
                email,
                otp: this.generateOtp(),
            });

            if (!otp) {
                throw new InternalServerErrorException("Can't create otp");
            }

            const transport = this.createTransport({
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
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred while sending otp',
            );
        }
    }

    async verfyOtp(body: { email: string; otp: number }) {
        const { email, otp } = body;
        const storedOtp = await this.userRepository.findOtpByEmail(email);
        if (!storedOtp) {
            throw new UnauthorizedException('Could not find the email');
        }
        if (storedOtp.otp !== otp) {
            return { message: 'not matching' };
        }

        const user = await this.userRepository.findByEmail(email);

        const accessToken = this.sign(user, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '15m',
        });

        const refreshToken = this.sign(user?.id, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: '7d',
        });

        return { message: 'success', accessToken, refreshToken };
    }
}
