import createHttpError from 'http-errors';

import * as contactsServices from '../services/contacts.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseContactFilterParams from '../utils/filters/parseContactFilterParams.js';

import { sortFields } from '../db/models/contact.js';

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);

  const { _id: userId } = req.user;

  const data = await contactsServices.getAllContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  res.json({
    status: 200,
    message: 'Contacts successfully found',
    data,
  });
};


export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactsServices.getContactById({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Contact with ${id} successfully found`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await contactsServices.createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Contact add successfully',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await contactsServices.updateContact(
    { _id: id, userId },
    req.body,
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact upsert successfully',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await contactsServices.updateContact(
    { _id: id, userId },
    req.body,
  );

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Contact patched successfully',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactsServices.deleteContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};
