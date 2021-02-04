const rateLimit = require('express-rate-limit');

// Redis client for the express-rate-limit middleware
const RedisStore = require('rate-limit-redis');

// redisURL from env
const { redis } = require('../../config/config');

/**
 * Redis configuration (currently beeing a simple connection string)
 * */
const redisStoreConfigPrivateLimiter = new RedisStore({
  redisURL: redis.redisURL,
  expiry: 1 * 60,
  prefix: 'rl-private:',
});

/**
 * default private limiter
 * used on /v1/private routes
 */
const PrivateLimiter = rateLimit({
  store: redisStoreConfigPrivateLimiter,
  windowMs: 60 * 1000, // 1 minute
  max: 40,
  skipSuccessfulRequests: false,
});

module.exports = {
  PrivateLimiter,
};
