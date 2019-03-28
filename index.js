import express from 'express';
import bodyPaser from 'body-parser';
import dotenv from 'dotenv';

import logger, { httpLogger } from './config/logger';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(httpLogger);
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({ message: 'welcome to sms management api' });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port: ${PORT}`);
});

module.exports = app;
