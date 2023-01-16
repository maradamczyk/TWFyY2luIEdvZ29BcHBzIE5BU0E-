import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
    nodeEnv?: string;
    port?: number;
    concurrentRequests?: number;
    nasaApiKey?: string;
    nasaUrl?: string;
}

const config: Config = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT) ?? 8080,
    concurrentRequests: Number(process.env.CONCURRENT_REQUESTS) ?? 5,
    nasaApiKey: process.env.API_KEY,
    nasaUrl: 'https://api.nasa.gov',
};

export default config;
