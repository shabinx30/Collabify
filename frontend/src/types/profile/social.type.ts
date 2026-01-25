export interface Social {
    username: string;
    account_type: string;
    media_count: string;
    followers_count: string;
    follows_count: string;
    website: string;
    profile_picture_url: string;
    biography: string;
    id: string;
    media: {
        data: {
            id: string;
            media_type: string;
            media_url: string;
            permalink: string;
            caption: string;
            comments_count: number;
            like_count: number;
            timestamp: string;
        }[];
        paging: {
            cursors: {
                before: string;
                after: string;
            };
        };
    };
}
