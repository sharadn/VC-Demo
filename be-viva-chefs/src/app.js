import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import {rateLimit} from 'express-rate-limit';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import databaseConnection from './database/connection.js';
import router from './routes/index.js'; 

const app = express();

//Set security-related HTTP headers with Helmet
app.use(helmet());

// Enable CORS (Cross-Origin Resource Sharing)
// app.use(cors({ origin: 'http://localhost:5173', credentials: true})); //Currently, allowing any origins
app.use(cors()); //Currently, allowing any origins

// Compress responses to reduce payload size
app.use(compression());

// Log HTTP requests in the console using Morgan
app.use(morgan('common'));

// Limit repeated requests to APIs with express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Parse incoming JSON payloads
app.use(express.json());

// Parse incoming URL-encoded payloads (typically for form submissions)
app.use(express.urlencoded({ extended: true}));

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(`${__dirname}/public`));

await databaseConnection();

app.use(router);


//Log errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  next(err);
});

//Client error handler
app.use((err, req, res, next) => {
  if (req.xhr) {
      res.status(500).send({ error: 'Something failed!' })
  } else {
      next(err)
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;