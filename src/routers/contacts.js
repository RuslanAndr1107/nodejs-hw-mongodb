import { Router } from 'express';

import * as contactControllers from '../controllers/contacts.js';

import {authenticate} from '../middlewares/authenticate.js';

import isValidId from '../middlewares/isValidId.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';

import {
 createContactchema,
  updateContactSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get(
  '/',
  ctrlWrapper(contactControllers.getAllContactsController),
);

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactControllers.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactchema),
  ctrlWrapper(contactControllers.createContactController),
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(createContactchema),
  ctrlWrapper(contactControllers.upsertContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(contactControllers.patchContactController),
);

contactsRouter.delete(
  '/:contactId', 
  isValidId,
  ctrlWrapper(contactControllers.deleteContactController),
);

export default contactsRouter;

