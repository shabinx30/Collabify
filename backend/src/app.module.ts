import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { UserService } from './application/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class AppModule {}
