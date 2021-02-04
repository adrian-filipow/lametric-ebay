const rateLimit = require('express-rate-limit');

// Redis client for the express-rate-limit middleware
const RedisStore = require('rate-limit-redis');

// redisURL from env
const { redis } = require('../../config/config');

/**
 * Redis configuration (currently beeing a simple connection string)
 * */
const redisStoreConfigPublicLimiter = new RedisStore({
  redisURL: redis.redisURL,
  expiry: 1 * 60,
  prefix: 'rl-public:',
});

/**
 * default public limiter
 * used on /v1/public routes
 */
const PublicLimiter = rateLimit({
  store: redisStoreConfigPublicLimiter,
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  skipSuccessfulRequests: false,
});

module.exports = {
  PublicLimiter,
};
