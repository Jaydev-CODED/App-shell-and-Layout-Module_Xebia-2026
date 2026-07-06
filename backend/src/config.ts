import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const PORT = process.env.PORT || 5000;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const REDIS_URL = process.env.REDIS_URL || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-jwt';
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Autodetect if we should use mock services
export const USE_MOCK_DB = !DATABASE_URL || DATABASE_URL.includes('username:password') || DATABASE_URL.includes('postgres:postgres');
export const USE_MOCK_REDIS = !REDIS_URL || REDIS_URL.includes('localhost:6379');

console.log('[Config] Environment Settings:', {
  PORT,
  NODE_ENV,
  USE_MOCK_DB,
  USE_MOCK_REDIS
});
