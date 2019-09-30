import express from 'express';
import hikeRoutes from './hike';

const router = express.Router();
router.use('/hike', hikeRoutes);

export default router;
