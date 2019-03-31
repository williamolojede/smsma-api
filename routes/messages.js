import express from 'express';
import {
  asyncWrapMiddleware,
  validateRequest,
  validateCreateMessageIds,
} from '../middlewares';
import schema from './schema';
import {
  createMessage,
  deleteMessage,
  getMessages,
} from '../controllers';

const router = express.Router();

router.post(
  '/',
  validateRequest(schema.createMessage),
  validateCreateMessageIds,
  asyncWrapMiddleware(createMessage),
);

router.get(
  '/',
  validateRequest(schema.getMessages),
  asyncWrapMiddleware(getMessages),
);

router.delete(
  '/:messageId',
  validateRequest(schema.deleteMessage),
  asyncWrapMiddleware(deleteMessage),
);

export default router;
