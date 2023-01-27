import { app } from '../../../server';
import request from 'supertest';

describe('get endpoints', () => {
  it('should get a products list', async () => {
    const res = await request(app)
      .get('/api/v1/products')
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Array));
  });

  it('should get a product by code', async () => {
    const res = await request(app)
      .get('/api/v1/products/1234567890123')
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body).toHaveProperty('code');

  });

});
