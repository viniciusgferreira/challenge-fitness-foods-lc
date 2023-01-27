import { app } from '../../../server';
import request from 'supertest';

describe('Put endpoints', () => {
  it('should edit a prodocut', async () => {
    const res = await request(app)
      .put('/api/v1/products/1234567890123')
      .send({
        'code': 1234567890123,
        'status': 'published',
        'imported_t': '2023-01-27T14:58:00.546Z',
        'url': 'http://world-en.openfoodfacts.org/product/8718215090328/katharos',
        'creator': 'kiliweb',
        'created_t': 1565504098,
        'last_modified_t': 1612868234,
        'product_name': 'test editing',
        'quantity': '',
        'brands': '',
        'categories': '',
        'labels': 'en:gluten-free',
        'cities': '',
        'purchase_places': '',
        'stores': '',
        'ingredients_text': '',
        'traces': '',
        'serving_size': '',
        'serving_quantity': '',
        'nutriscore_score': '',
        'nutriscore_grade': '',
        'main_category': '',
        'image_url': 'https://static.openfoodfacts.org/images/products/871/821/509/0328/front_fr.14.400.jpg'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('msg');
  });
});
