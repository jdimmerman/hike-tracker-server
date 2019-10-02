import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Handling request at ${req.method} ${req.path}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
});
router.use(routes);

/* eslint-disable-next-line no-unused-vars */
router.use((err, req, res, next) => {
  console.log(`Exception while handling request at ${req.path}, with ${err.message}`);
  res.status(err.status || 500).json({ error: err.message });
});
app.use('/api', router);

export default app;
