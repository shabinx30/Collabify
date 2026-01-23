import { Injectable } from "@nestjs/common";
import { SearchRepository } from "./search.repository";
    
@Injectable()
export class SearchService {
    constructor(
        private readonly searchRepository: SearchRepository,
    ) {}

    async searchCreators() {
        return await this.searchRepository.searchCreators();
    }
}
