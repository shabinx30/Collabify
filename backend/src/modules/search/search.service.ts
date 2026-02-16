import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
    Inject,
} from '@nestjs/common';
import { SearchRepository } from './search.repository';
import { GoogleGenAI } from '@google/genai';
import { systemInstruction } from '../../common/const/ai-instuctions';

@Injectable()
export class SearchService {
    private readonly genAI: GoogleGenAI;
    constructor(
        private readonly searchRepository: SearchRepository,
        @Inject('REDIS_CLIENT') private readonly redisService,
    ) {
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
        query = query.trim();

        if (!query || query.length === 0 || query.length > 200) {
            throw new BadRequestException('Invalid query');
        }

        const cachedResult = await this.redisService.get(`search:${query}`);
        if (cachedResult) {
            return JSON.parse(cachedResult);
        }

        const parsedQuery = await this.parseQuery(query);
        const { platform, categories, location, minRating, sortBy } =
            typeof parsedQuery === 'string'
                ? JSON.parse(parsedQuery)
                : parsedQuery;

        const pipeline: any[] = [
            // 1. Only verified creators
            {
                $match: {
                    role: 'creator',
                    isVerified: true,
                },
            },

            // 2. Categories (regex search on array elements)
            ...(categories && categories.length
                ? [
                      {
                          $match: {
                              categories: {
                                  $elemMatch: {
                                      $regex: categories.join('|'),
                                      $options: 'i',
                                  },
                              },
                          },
                      },
                  ]
                : []),

            // 3. Location (prefix match)
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

            // 5. Lookup social accounts (WITH optional platform filter)
            {
                $lookup: {
                    from: 'socialmedias',
                    let: { userId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$userId', '$$userId'] },
                            },
                        },
                        ...(platform
                            ? [
                                  {
                                      $match: { platform },
                                  },
                              ]
                            : []),
                    ],
                    as: 'social',
                },
            },

            // 6. Sorting
            ...(sortBy === 'followers'
                ? [
                      {
                          $addFields: {
                              maxFollowers: {
                                  $max: '$social.followers',
                              },
                          },
                      },
                      { $sort: { maxFollowers: -1 } },
                  ]
                : sortBy === 'engagement'
                  ? [
                        {
                            $addFields: {
                                maxEngagement: {
                                    $max: '$social.engagementRate',
                                },
                            },
                        },
                        { $sort: { maxEngagement: -1 } },
                    ]
                  : sortBy === 'rating'
                    ? [{ $sort: { rating: -1 } }]
                    : []),

            // 7. Final projection
            {
                $project: {
                    _id: 0,
                    username: 1,
                    profile: 1,
                    rating: 1,
                    categories: 1,
                    location: 1,
                    social: {
                        platform: 1,
                        userName: 1,
                        followers: 1,
                        engagementRate: 1,
                    },
                },
            },
        ];

        const creators = await this.searchRepository.searchCreators(pipeline);
        await this.redisService.set(
            `search:${query}`,
            JSON.stringify(creators),
            60,
        );
        return creators;
    }
}
