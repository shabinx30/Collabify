import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Otp, otpSchema } from './schemas/otp.schema';
import { UserRepository } from './user.repository.impl';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: userSchema },
            { name: Otp.name, schema: otpSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserRepository],
})
export class UserModule {}
