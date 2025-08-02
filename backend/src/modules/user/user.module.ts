import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Otp } from './schemas/otp.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: userSchema },
            { name: Otp.name, schema: userSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
