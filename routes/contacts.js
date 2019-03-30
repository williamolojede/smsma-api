import express from 'express';

import { validateRequest, asyncWrapMiddleware } from '../middlewares';
import { createContact, getContact, updateContact, deleteContact } from '../controllers';
import schema from './schema';

const router = express.Router();

router.post('/', validateRequest(schema.createContact), asyncWrapMiddleware(createContact));
router.get('/:id', validateRequest(schema.getContact), asyncWrapMiddleware(getContact));
router.put('/:id', validateRequest(schema.updateContact), asyncWrapMiddleware(updateContact));
router.delete('/:id', validateRequest(schema.deleteContact), asyncWrapMiddleware(deleteContact));

export default router;
