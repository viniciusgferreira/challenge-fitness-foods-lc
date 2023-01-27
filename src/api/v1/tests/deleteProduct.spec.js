import { app } from '../../../server';
import request from 'supertest';

describe('delete endpoints', () => {
  it('should get a delete response msg', async () => {
    const res = await request(app)
      .delete('/api/v1/products/1234567890123')
      .send();

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('msg');
  });

});
