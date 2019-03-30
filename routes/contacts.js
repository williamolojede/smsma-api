import express from 'express';

import { validateRequest, asyncWrapMiddleware } from '../middlewares';
import { createContact, getContact } from '../controllers';
import schema from './schema';

const router = express.Router();

router.post('/', validateRequest(schema.createContact), asyncWrapMiddleware(createContact));
router.get('/:id', validateRequest(schema.getContact), asyncWrapMiddleware(getContact));

export default router;
