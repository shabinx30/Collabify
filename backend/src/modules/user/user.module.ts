import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Otp, otpSchema } from './schemas/otp.schema';
import { UserRepository } from './user.repository.impl';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: userSchema },
            { name: Otp.name, schema: otpSchema },
        ]),
        JwtModule.register({}),
    ],
    providers: [
        UserService,
        UserRepository,
        {
            provide: 'ACCESS_JWT',
            useFactory: () =>
                new JwtService({
                    secret: process.env.ACCESS_TOKEN_SECRET,
                    signOptions: { expiresIn: '15m' },
                }),
        },
        {
            provide: 'REFRESH_JWT',
            useFactory: () =>
                new JwtService({
                    secret: process.env.REFRESH_TOKEN_SECRET,
                    signOptions: { expiresIn: '7d' },
                }),
        },
    ],
    controllers: [UserController],
    exports:["ACCESS_JWT", "REFRESH_JWT"]
})
export class UserModule {}
