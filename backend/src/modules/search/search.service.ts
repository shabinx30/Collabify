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

    async parseQuery(query: string) {
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

            return response.text;
        } catch (error) {
            console.log({ error });
            throw new InternalServerErrorException('Failed to parse');
        }
    }

    async searchCreators(query: string) {
        if (!query || query.trim().length === 0) {
            throw new BadRequestException('Invalid query');
        }

        const parsedQuery = await this.parseQuery(query);
        console.log({ parsedQuery });

        try {
            
        } catch (error) {
            throw new InternalServerErrorException('Failed to search');
        }
    }
}
