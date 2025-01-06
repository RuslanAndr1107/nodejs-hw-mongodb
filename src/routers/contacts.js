import { Router } from 'express';
import express from 'express';
import {
  getContactByUserIdController,
  createContactController,
  deleteContactController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import { authenticate } from '../middlewares/authenticate.js';


const jsonParser = express.json();
const router = Router();

router.use(authenticate);
router.get('/', authenticate, ctrlWrapper(getContactsController));

router.get(
  '/user/:id',
  authenticate,
  isValidId,
  ctrlWrapper(getContactByUserIdController),
);

router.post(
  '/',
  authenticate,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(deleteContactController),
);

router.patch(
  '/:id',
  authenticate,
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

export default router;
