import request from 'supertest';
import app from './app';

it('should recieve 404 for request on incorrect route', async () => {
  const response = await request(app).get('/blah');
  expect(response.statusCode).toBe(404);
});

it('should recieve 500 with good response body for request with invalid parameters', async () => {
  const response = await request(app).put('/api/hike');
  expect(response.statusCode).toBe(500);
  expect(response.body.error).toBeDefined();
});
