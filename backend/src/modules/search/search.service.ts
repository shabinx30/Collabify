import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { SearchRepository } from './search.repository';
import { GoogleGenAI } from '@google/genai';
import { systemInstruction } from '../../common/const/ai-instuctions';

@Injectable()
export class SearchService {
    private readonly genAI: GoogleGenAI;
    constructor(private readonly searchRepository: SearchRepository) {
        this.genAI = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
    }

    async parseQuery(query: string): Promise<string> {
        try {
            const response = await this.genAI.models.generateContent({
                model: 'gemini-2.5-flash-lite',
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: query }],
                    },
                ],
                config: {
                    systemInstruction: {
                        parts: [{ text: systemInstruction }],
                    },
                    responseMimeType: 'application/json',
                },
            });

            return response.text || '';
        } catch (error) {
            console.log({ error });
            throw new InternalServerErrorException('Failed to parse');
        }
    }

    async searchCreators(query: string) {
        if (!query || query.trim().length === 0 || query.trim().length > 100) {
            throw new BadRequestException('Invalid query');
        }

        const parsedQuery = await this.parseQuery(query);
        const { platform, categories, location, minRating, sortBy } =
            typeof parsedQuery === 'string'
                ? JSON.parse(parsedQuery)
                : parsedQuery;

        const pipeline: any[] = [
            // 1. Only creators
            {
                $match: {
                    role: 'creator',
                    isVerified: true,
                },
            },

            // 2. Filter by niche (categories)
            ...(categories
                ? [
                      {
                          $match: {
                              categories: { $in: categories },
                          },
                      },
                  ]
                : []),

            // 3. Hierarchical location match
            ...(location
                ? [
                      {
                          $match: {
                              location: {
                                  $regex: `^${location}`,
                                  $options: 'i',
                              },
                          },
                      },
                  ]
                : []),

            // 4. Minimum rating
            ...(minRating
                ? [
                      {
                          $match: {
                              rating: { $gte: minRating },
                          },
                      },
                  ]
                : []),

            // 5. Join social media accounts
            {
                $lookup: {
                    from: 'socialmedias',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'social',
                },
            },

            // 6. Flatten social accounts
            { $unwind: '$social' },

            // 7. Platform filter
            ...(platform
                ? [
                      {
                          $match: {
                              'social.platform': platform,
                          },
                      },
                  ]
                : []),

            // 8. Sorting
            ...(sortBy === 'followers'
                ? [{ $sort: { 'social.followers': -1 } }]
                : sortBy === 'engagement'
                  ? [{ $sort: { 'social.engagementRate': -1 } }]
                  : sortBy === 'rating'
                    ? [{ $sort: { rating: -1 } }]
                    : []),

            // 9. Final output shape
            {
                $project: {
                    _id: 0,
                    username: 1,
                    profile: 1,
                    rating: 1,
                    categories: 1,
                    location: 1,
                    social: {
                        platform: '$social.platform',
                        userName: '$social.userName',
                        followers: '$social.followers',
                        engagementRate: '$social.engagementRate',
                    },
                },
            },
        ];

        const creators = await this.searchRepository.searchCreators(pipeline);
        return creators;
    }
}
