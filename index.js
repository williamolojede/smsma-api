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
app.use(
  (
    {
      message,
      statusCode = 500,
      stack,
      type,
    },
    req, res, next,
  ) => {
    if (type) logger.info(`TYPE: ${type}(tip: you might want to handle this error type in the error generator)`);
    if (statusCode === 500) logger.info(stack);

    res
      .status(statusCode)
      .send({
        message: statusCode === 500 ? 'Internal server error' : message,
        status: 'fail',
      });
  },
);

app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});
module.exports = app;
