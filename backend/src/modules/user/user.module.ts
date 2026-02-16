import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';
import {
    AdminUserController,
    UserController,
    AuthController,
} from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository.impl';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SocialMedia, socialMediaSchema } from './schemas/socialMedia.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: userSchema },
            { name: SocialMedia.name, schema: socialMediaSchema },
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
    controllers: [UserController, AdminUserController, AuthController],
    exports: ['ACCESS_JWT', 'REFRESH_JWT'],
})
export class UserModule {}
