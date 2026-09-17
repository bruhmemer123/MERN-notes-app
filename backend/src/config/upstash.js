import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import dotenv from 'dotenv'

dotenv.config()

let redis;
try {
    redis = Redis.fromEnv()
} catch {
    console.warn("Upstash Redis credentials missing. Rate limiting disabled.");
}

export const globalRateLimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '60 s'),
        analytics: true,
    })
    : null;

// Auth Limiter (Brute-force protection): 5 attempts per 15 mins per client IP
export const authRateLimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '15 m'),
        analytics: true,
    })
    : null;