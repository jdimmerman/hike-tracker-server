import express from 'express';
import Hike from '../models/hike';

const router = express.Router();

router.get('/', (req, res, next) => {
  Hike.find((err, hikes) => {
    if (err) {
      return next(err) 
    }
    res.status(200).json(hikes);
  });
});

router.put('/', (req, res, next) => {
  Hike.create(req.body, (err, createdHike) => {
    if (err) {
      return next(err);
    }
    res.status(201).json(createdHike);
  });
});

router.delete('/:id', (req, res, next) => {
  Hike.deleteOne({ _id: req.params.id }, (err, deletionStats) => {
    if (err) {
      return next(err) 
    }
    if (deletionStats.deletedCount == 0) {
      res.status(404).send();
    } else {
      res.status(200).json(deletionStats);
    }
  });
});

export default router;
