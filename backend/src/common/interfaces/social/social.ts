export interface Social {
    userId: string;
    accountType: string;
    platform: string;
    platformUserId: string;
    token: {
        accessToken: string;
        expiresIn: number;
    };
}
