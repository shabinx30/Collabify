export type SearchQuery = {
    platform: 'instagram' | 'youtube' | null;
    categories: string[] | null;
    location: string | null;
    minRating: number | null;
    sortBy: 'followers' | 'rating' | 'engagement' | null;
};
