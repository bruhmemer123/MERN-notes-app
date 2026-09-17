// Helper middleware factory to support custom limiters
export const createRateLimiter = (limiterInstance) => async (req, res, next) => {
    if (!limiterInstance) {
        return next(); // Skip rate limiting if Redis isn't configured
    }

    try {
        // Use client IP (or authenticated User ID if available)
        const identifier = req.user?._id?.toString() || req.ip || req.headers["x-forwarded-for"] || "anonymous";

        const { success, limit, remaining, reset } = await limiterInstance.limit(identifier);

        // Standard RateLimit HTTP response headers
        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader("X-RateLimit-Remaining", remaining);
        res.setHeader("X-RateLimit-Reset", reset);

        if (!success) {
            return res.status(429).json({
                message: "Too many requests. Please try again later.",
            });
        }

        next();
    } catch (error) {
        console.error("Rate limiter error:", error);
        // Fail open: don't block users if Redis goes down
        next();
    }
};