import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    setupFiles: ['./jest-setup-file.ts'],
};

export default config;
