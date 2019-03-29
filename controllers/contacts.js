import models from '../models';
import { errorHandler } from '../lib';

const { Contact } = models;

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).send({
      message: 'Contact created successfully!',
      contact,
    });
  } catch (err) {
    errorHandler(err, next);
  }
};
