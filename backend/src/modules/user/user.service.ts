import { BadRequestException, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository.impl';
import { SignDto } from './dtos/signup.dto';
import jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private jwt: jwt,
    ) {}

    async createUser(body: SignDto): Promise<IToken> {
        const existingUser = await this.userRepository.findByEmail(body.email);

        if (existingUser?.isVerified) {
            throw new BadRequestException('User is already Existing');
        }
        try {
            const newUser = await this.userRepository.create(body);

            const accessToken: string = this.jwt.sign(newUser, {
                secret: process.env.ACCESS_TOKEN_SECRET,
                expiresIn: '15m',
            });

            const refreshToken: string = this.jwt.sign(newUser.id, {
                secret: process.env.ACCESS_TOKEN_SECRET,
                expiresIn: '7d',
            });

            return { accessToken, refreshToken };
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred.',
            );
        }
    }
}
