import express from 'express';
import bodyPaser from 'body-parser';
import dotenv from 'dotenv';

import logger, { httpLogger } from './config/logger';
import router from './routes';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(httpLogger);
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

// API ROUTES
app.use('/api', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  next(err);
});

// error handler
// define as the last app.use callback
/* eslint no-unused-vars: 0 */
app.use(({ message, statusCode }, req, res, next) => {
  // defaults to internal server error
  res
    .status(statusCode || 500)
    .send({
      message,
      status: 'fail',
    });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
module.exports = app;
