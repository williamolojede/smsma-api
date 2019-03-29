import express from 'express';

import { validateRequest } from '../middlewares';
import { createContact } from '../controllers';
import schema from './schema';

const router = express.Router();

router.post('/', validateRequest(schema.createContact), createContact);

export default router;
