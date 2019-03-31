import express from 'express';
import {
  asyncWrapMiddleware,
  validateRequest,
  validateCreateMessageIds,
} from '../middlewares';
import schema from './schema';
import { createMessage } from '../controllers';

const router = express.Router();

router.post(
  '/',
  validateRequest(schema.createMessage),
  validateCreateMessageIds,
  asyncWrapMiddleware(createMessage),
);

export default router;
