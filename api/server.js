import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from 'mongoose';
import { mongoHost, mongoPort, mongoDbName} from './constants';
import { resolveSoa } from 'dns';

mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDbName}`, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const PORT = 8081;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Handling request at ${req.method} ${req.path}`);
  next();
});
router.use((err, req, res, next) => {
  console.log(`Exception while handling request at ${req.path}, with ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    error: err.message
  });
});
router.use(routes);

app.use('/api', router);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
