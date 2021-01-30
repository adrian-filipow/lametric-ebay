const rateLimit = require('express-rate-limit');

// Redis client for the express-rate-limit middleware
const RedisStore = require('rate-limit-redis');

// redisURL from env
const { redis } = require('../config/config');

/**
 * Redis configuration (currently beeing a simple connection string)
 * can be changed to detailed configuration using:
 * Redis Client (https://github.com/NodeRedis/node-redis)
 * or
 * Ioredis Client (https://github.com/luin/ioredis)
 * */
const redisStoreConfig = new RedisStore({
  redisURL: redis.redisURL,
});

const authLimiter = rateLimit({
  store: redisStoreConfig,
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
};
