import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository.impl';
import { UserDocument } from './schemas/user.schema';
import { createUserDto } from './dtos/signup.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(body: createUserDto): Promise<UserDocument> {
        return this.userRepository.create(body);
    }
}
