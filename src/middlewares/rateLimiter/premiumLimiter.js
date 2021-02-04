const rateLimit = require('express-rate-limit');

// Redis client for the express-rate-limit middleware
const RedisStore = require('rate-limit-redis');

// redisURL from env
const { redis } = require('../../config/config');

/**
 * Redis configuration (currently beeing a simple connection string)
 * */
const redisStoreConfigPremiumLimiter = new RedisStore({
  redisURL: redis.redisURL,
  expiry: 1 * 60,
  prefix: 'rl-premium:',
});

/**
 * premium private limiter
 * used on /v1/premium routes when user has billing enabled
 */
const PremiumLimiter = rateLimit({
  store: redisStoreConfigPremiumLimiter,
  windowMs: 60 * 1000, // 1 minute
  max: 1000,
  skipSuccessfulRequests: false,
});

module.exports = {
  PremiumLimiter,
};
