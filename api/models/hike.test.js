import Hike from './hike';
import { setupMongo, teardownMongo} from '../spec/specHelper';

const hike = {
  name: 'name1',
  distanceFromBostonHours: 1.1,
  hikeDistanceMiles: 1.1
};
  
beforeAll(async () => {
  await setupMongo();
});

afterAll((done) => {
  teardownMongo().then(() => done());
});

it('can create hike', async () => {
  const savedHike = await Hike.create(hike);

  expect(savedHike._id).toBeDefined();
  expect(savedHike.name).toBe(hike.name);
  expect(savedHike.distanceFromBostonHours).toBe(hike.distanceFromBostonHours);
  expect(savedHike.hikeDistanceMiles).toBe(hike.hikeDistanceMiles);
});

it('can retrieve hike', async () => {
  const savedHike = await Hike.create(hike);
  const retrievedHikes = await Hike.find({ _id: savedHike._id});

  expect(retrievedHikes.length).toBe(1);

  expect(retrievedHikes[0]._id).toBeDefined();
  expect(retrievedHikes[0].name).toBe(hike.name);
  expect(retrievedHikes[0].distanceFromBostonHours).toBe(hike.distanceFromBostonHours);
  expect(retrievedHikes[0].hikeDistanceMiles).toBe(hike.hikeDistanceMiles);
});

it('can delete hike', async () => {
  const savedHike = await Hike.create(hike);
  await Hike.remove({ _id: savedHike._id});
  const retrievedHikes = await Hike.find({ _id: savedHike._id});

  expect(retrievedHikes.length).toBe(0);
});

it('cannot save hike with missing name', async () => {
  const invalidHike = Object.assign({}, hike);
  delete invalidHike.name;
  await expect(Hike.create(invalidHike)).rejects.toThrow();
});

it('cannot save hike with empty name', async () => {
  const invalidHike = Object.assign({}, hike);
  invalidHike.name = '  ';
  await expect(Hike.create(invalidHike)).rejects.toThrow();
});

it('cannot save hike with missing distanceFromBostonHours', async () => {
  const invalidHike = Object.assign({}, hike);
  delete invalidHike.distanceFromBostonHours;
  await expect(Hike.create(invalidHike)).rejects.toThrow();
});

it('cannot save hike with non-number distanceFromBostonHours', async () => {
  const invalidHike = Object.assign({}, hike);
  invalidHike.distanceFromBostonHours = '  ';
  await expect(Hike.create(invalidHike)).rejects.toThrow();
});

it('cannot save hike with negative distanceFromBostonHours', async () => {
  const invalidHike = Object.assign({}, hike);
  invalidHike.distanceFromBostonHours = -1;
  await expect(Hike.create(invalidHike)).rejects.toThrow();
});

it('cannot save hike with missing hikeDistanceMiles', async () => {
  const invalidHike = Object.assign({}, hike);
  delete invalidHike.hikeDistanceMiles;
  await expect(Hike.create(invalidHike)).rejects.toThrow();
});

it('cannot save hike with non-number hikeDistanceMiles', async () => {
  const invalidHike = Object.assign({}, hike);
  invalidHike.hikeDistanceMiles = '  ';
  await expect(Hike.create(invalidHike)).rejects.toThrow();
});

it('cannot save hike with negative hikeDistanceMiles', async () => {
  const invalidHike = Object.assign({}, hike);
  invalidHike.hikeDistanceMiles = -1;
  await expect(Hike.create(invalidHike)).rejects.toThrow();
});
