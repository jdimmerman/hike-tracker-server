import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

export function setupApp() {
  var app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  return app;
}

export async function setupMongo() {
  await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
}

export async function teardownMongo(done) {
  mongoose.disconnect(done);
}
