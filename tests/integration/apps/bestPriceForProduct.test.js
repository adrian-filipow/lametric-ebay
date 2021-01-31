const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../../src/app');
const setupTestDB = require('../../utils/setupTestDB');
const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { userOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Private bestPriceForProduct routes', () => {
  describe('GET /v1/private/bestPriceForProduct', () => {
    test('should return result byProduct with goal', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .get('/v1/private/bestPriceForProduct?mode=byProduct&market=EBAY-DE&payload=232182568&title=XBOX&goal=400')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        frames: [
          {
            text: 'XBOX',
            icon: 'a15297',
          },
          {
            text: expect.anything(),
            icon: expect.anything(),
          },
          {
            text: expect.anything(),
            icon: 'i59',
          },
          {
            text: expect.anything(),
            icon: null,
          },
          {
            index: 4,
            chartData: expect.anything(),
          },
        ],
      });
    });
    test('should return result byKeyword with goal', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .get('/v1/private/bestPriceForProduct?mode=byKeyword&market=EBAY-DE&payload=Fernseher&title=Fernseher&goal=400')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        frames: [
          {
            text: 'Fernseher',
            icon: 'a15297',
          },
          {
            text: expect.anything(),
            icon: expect.anything(),
          },
          {
            text: expect.anything(),
            icon: 'i59',
          },
          {
            text: expect.anything(),
            icon: null,
          },
          {
            index: 4,
            chartData: expect.anything(),
          },
        ],
      });
    });
    test('should return result byKeyword without goal', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .get('/v1/private/bestPriceForProduct?mode=byKeyword&market=EBAY-DE&payload=Fernseher&title=Fernseher')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        frames: [
          {
            text: 'Fernseher',
            icon: 'a15297',
          },
          {
            text: expect.anything(),
            icon: expect.anything(),
          },
          {
            text: expect.anything(),
            icon: null,
          },
          {
            index: 4,
            chartData: expect.anything(),
          },
        ],
      });
    });
    test('should return result byProduct without goal', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .get('/v1/private/bestPriceForProduct?mode=byProduct&market=EBAY-DE&payload=232182568&title=XBOX')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        frames: [
          {
            text: 'XBOX',
            icon: 'a15297',
          },
          {
            text: expect.anything(),
            icon: expect.anything(),
          },
          {
            text: expect.anything(),
            icon: null,
          },
          {
            index: 4,
            chartData: expect.anything(),
          },
        ],
      });
    });
    test('should return BAD_REQUEST if title is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .get('/v1/private/bestPriceForProduct?mode=byProduct&market=EBAY-DE&payload=232182568')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return BAD_REQUEST if payload is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .get('/v1/private/bestPriceForProduct?mode=byProduct&market=EBAY-DE&title=XBOX')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return BAD_REQUEST if market is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .get('/v1/private/bestPriceForProduct?mode=byProduct&payload=232182568&title=XBOX')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return BAD_REQUEST if mode is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .get('/v1/private/bestPriceForProduct?market=EBAY-DE&payload=232182568&title=XBOX')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });
    test('should return UNAUTHORIZED if access token is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .get('/v1/private/bestPriceForProduct?mode=byProduct&market=EBAY-DE&payload=232182568&title=XBOX&goal=400')
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
