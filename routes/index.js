import express from 'express';

import contactsRouter from './contacts';
import messagesRouter from './messages';

const v1 = express.Router();

v1.get('/v1', (req, res) => {
  res.send({ message: 'welcome to sms management api(v1)' });
});

v1.use('/v1/contacts', contactsRouter);
v1.use('/v1/messages', messagesRouter);

export default v1;
