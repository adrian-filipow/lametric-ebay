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

/**
 * auth limiter
 * used on /v1/auth routes
 */
const authLimiter = rateLimit({
  store: redisStoreConfig,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  skipSuccessfulRequests: true,
});

/**
 * default public limiter
 * used on /v1/public routes
 */
const defaultPublicLimiter = rateLimit({
  store: redisStoreConfig,
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  skipSuccessfulRequests: true,
});

/**
 * default private limiter
 * used on /v1/private routes
 */
const defaultPrivateLimiter = rateLimit({
  store: redisStoreConfig,
  windowMs: 60 * 1000, // 1 minute
  max: 40,
  skipSuccessfulRequests: true,
});

/**
 * premium private limiter
 * used on /v1/private routes when user has billing enabled
 */
const premiumPrivateLimiter = rateLimit({
  store: redisStoreConfig,
  windowMs: 60 * 1000, // 1 minute
  max: 10000,
  skipSuccessfulRequests: true,
});

module.exports = {
  authLimiter,
  defaultPublicLimiter,
  defaultPrivateLimiter,
  premiumPrivateLimiter,
};
