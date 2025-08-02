import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        MongooseModule.forRoot(process.env.MONGODB_URL as string),

        UserModule,
    ],
})
export class AppModule {}
