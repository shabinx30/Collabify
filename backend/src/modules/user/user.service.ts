import { BadRequestException, Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository.impl';
import { UserDocument } from './schemas/user.schema';
import { createUserDto } from './dtos/signup.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(body: createUserDto): Promise<UserDocument | void> {
        try {
            const existingUser = await this.userRepository.findByEmail(
                body.email,
            );

            if (existingUser && existingUser.isVerified) {
                throw new BadRequestException('User is already Existing');
            }

            return await this.userRepository.create(body);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An unexpected error occurred.',
            );
        }
    }
}
