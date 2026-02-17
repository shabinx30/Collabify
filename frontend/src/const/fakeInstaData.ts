import { Social } from "@/types/profile/social.type";

export const fakeInstaData: Social = {
    username: "shabinsharih",
    account_type: "CREATOR",
    media_count: "100",
    followers_count: "1000",
    follows_count: "100",
    website: "https://shabin.com",
    profile_picture_url: "/images/infu-1.jpeg",
    biography: "I am a software engineer",
    id: "1234567890",
    media: {
        data: [
            {
                id: "1234567890",
                media_type: "IMAGE",
                media_url: "/images/infu-1.jpeg",
                permalink: "/images/infu-1.jpeg",
                caption: "I am a software engineer",
                comments_count: 0,
                like_count: 0,
                timestamp: "2022-01-01T00:00:00.000Z",
            },
        ],
    },
};
