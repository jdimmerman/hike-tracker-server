import app from './app';
import mongoose from 'mongoose';
import { MONGO_URL, PORT } from './constants';

mongoose.connect(MONGO_URL, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
