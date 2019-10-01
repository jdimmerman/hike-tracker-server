import mongoose from 'mongoose';

const hikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: value => {
      return value.trim() !== '';
    }
  },
  distanceFromBostonHours: {
    type: Number,
    required: true,
    validate: value => {
      return value > 0;
    }
  },
  hikeDistanceMiles: {
    type: Number,
    required: true,
    validate: value => {
      return value > 0;
    }
  }
});

export default mongoose.model('Hike', hikeSchema);
