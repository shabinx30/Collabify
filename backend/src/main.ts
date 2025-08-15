import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });

    // Global validation & transformation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const port = process.env.PORT || 4002;
    await app.listen(port);
    console.log(`Server running on port ${port}`);
}

bootstrap();
