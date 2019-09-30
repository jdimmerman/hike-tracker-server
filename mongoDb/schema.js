import { loadavg } from "os";

// execute with mongo shell
// Right now this does nothing other than error if the service isn't running
// because mongo db's and collections are created when written to and this initializes no data

load('./constants.js');

const port = 27017;
const host = 'localhost';
const dbName = 'hikeTracker';
const hikeCollectionName = 'hikes';

const conn = new Mongo(`${host}:${port}`);
const hikeTrackerDb = conn.getDB(dbName);
const hikesCollection = hikeTrackerDb.getCollection(hikeCollectionName);
