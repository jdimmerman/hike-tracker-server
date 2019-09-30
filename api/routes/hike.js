import express from 'express';
import Hike from '../models/hike';
import { runInNewContext } from 'vm';

const router = express.Router();

router.get('/', (req, res, next) => {
  Hike.find((err, hikes) => {
    if (err) {
      return next(err) 
    };
    res.status(200).json(hikes);
  });
});

router.put('/', (req, res, next) => {
  console.log(req.body);
  Hike.create(req.body, (err, hikes) => {
    if (err) {
      return next(err) 
    };
    res.status(200).json(hikes);
  });
});

export default router;
