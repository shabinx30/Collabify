import { Module, Global } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: async () => {
                const client = createClient({
                    url: process.env.REDIS_URL,
                });

                client.on('error', (err) => {
                    console.log('Redis Error: ', err);
                });

                await client.connect();
                console.log('Redis connected');
                return client;
            },
        },
    ],
    exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
