const rateLimit = require('express-rate-limit');

// Redis client for the express-rate-limit middleware
const RedisStore = require('rate-limit-redis');

// redisURL from env
const { redis } = require('../../config/config');

/**
 * Redis configuration (currently beeing a simple connection string)
 * */
const redisStoreConfigAuthLimiter = new RedisStore({
  redisURL: redis.redisURL,
  expiry: 15 * 60,
  prefix: 'rl-auth:',
});

/**
 * auth limiter
 * used on /v1/auth routes
 */
const authLimiter = rateLimit({
  store: redisStoreConfigAuthLimiter,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};
