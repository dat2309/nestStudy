interface JwtPayload {
    accountName: string;
    sub: number;  // Account ID
    role?: string; // Optional role
    userId: number;
    token?: string; // Optional token
}
