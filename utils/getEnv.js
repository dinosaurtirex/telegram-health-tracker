import dotenv from 'dotenv';
dotenv.config();
export function getEnv() {
    return process.env;
}
