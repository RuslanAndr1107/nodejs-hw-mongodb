import contactCollection from '../db/models/contact.js';

export const getAllContacts = async() => await contactCollection.find();

export const getContactById = async(id) => await contactCollection.findById(id);

export const postContact = async(body) => await contactCollection.create(body);
