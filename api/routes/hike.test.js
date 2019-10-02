import request from 'supertest';
import hikeRoutes from './hike';
import { setupApp, setupMongo, teardownMongo} from '../spec/specHelper';
import mongoose from 'mongoose';

const hike = {
  name: 'name1',
  distanceFromBostonHours: 1.1,
  hikeDistanceMiles: 1.1
};

let app;
beforeAll(async () => {
  app = setupApp();
  app.use(hikeRoutes);
  await setupMongo();
});

afterAll((done) => {
  teardownMongo().then(() => done());
});

it('should PUT hike', async () => {
  const response = await request(app).put('/')
    .send(hike)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(hike.name);
  expect(response.body.distanceFromBostonHours).toBe(hike.distanceFromBostonHours);
  expect(response.body.hikeDistanceMiles).toBe(hike.hikeDistanceMiles);
  expect(response.body._id).toBeDefined();
});

it('should GET hike', async () => {
  const putResponse = await request(app).put('/')
    .send(hike)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
  const getResponse = await request(app).get('/');
  expect(getResponse.statusCode).toBe(200);
  expect(getResponse.body.length).toBeGreaterThanOrEqual(1);
  const expectedHike = getResponse.body.find(h => h._id === putResponse.body._id);
  expect(expectedHike).toBeDefined();
  expect(expectedHike.name).toBe(hike.name);
  expect(expectedHike.distanceFromBostonHours).toBe(hike.distanceFromBostonHours);
  expect(expectedHike.hikeDistanceMiles).toBe(hike.hikeDistanceMiles);
  expect(expectedHike._id).toBeDefined();
});

it('should DELETE hike', async () => {
  const putResponse = await request(app).put('/')
    .send(hike)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
  const deleteResponse = await request(app).delete(`/${putResponse.body._id}`);
  expect(deleteResponse.statusCode).toBe(200);
  const getResponse = await request(app).get('/');
  const expectedDeletedHike = getResponse.body.find(h => h._id === putResponse.body._id);
  expect(expectedDeletedHike).not.toBeDefined();
});

it('should throw 404 when DELETE non-existent hike using valid id', async () => {
  const fakeId = mongoose.Types.ObjectId();
  const deleteResponse = await request(app).delete(`/${fakeId}`);
  expect(deleteResponse.statusCode).toBe(404);
});

it('should throw 404 when DELETE non-existent hike using invalid id', async () => {
  const fakeId = 'blah';
  const deleteResponse = await request(app).delete(`/${fakeId}`);
  expect(deleteResponse.statusCode).toBe(404);
});

it('should get error for PUT of invalid hike', async () => {
  const invalidHike = Object.assign({}, hike);
  delete invalidHike.name;
  const response = await request(app).put('/')
    .send(invalidHike)
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');
  expect(response.statusCode).toBe(500);
});
