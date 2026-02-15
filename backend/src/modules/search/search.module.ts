import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchRepository } from './search.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../user/schemas/user.schema';
import {
    SocialMedia,
    socialMediaSchema,
} from '../user/schemas/socialMedia.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: userSchema },
            { name: SocialMedia.name, schema: socialMediaSchema },
        ]),
    ],
    providers: [SearchService, SearchRepository],
    controllers: [SearchController],
    exports: [SearchService],
})
export class SearchModule {}
