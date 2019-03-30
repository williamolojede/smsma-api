import express from 'express';

import { validateRequest, asyncWrapMiddleware } from '../middlewares';
import { createContact, getContact, updateContact } from '../controllers';
import schema from './schema';

const router = express.Router();

router.post('/', validateRequest(schema.createContact), asyncWrapMiddleware(createContact));
router.get('/:id', validateRequest(schema.getContact), asyncWrapMiddleware(getContact));
router.put('/:id', validateRequest(schema.updateContact), asyncWrapMiddleware(updateContact));

export default router;
