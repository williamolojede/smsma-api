import models from '../models';

const { Contact, Message } = models;

export const createContact = async (req) => {
  const contact = await Contact.create(req.body);
  return {
    payload: {
      message: 'Contact created successfully!',
      contact,
    },
    statusCode: 201,
  };
};

export const getContact = async (req) => {
  const { id } = req.params;
  const contact = await Contact.findByPk(id, {
    include: [
      {
        model: Message,
        as: 'sentMessages',
      },
      {
        model: Message,
        as: 'receivedMessages',
      },
    ],
  });
  if (!contact) {
    const err = new Error('Contact not found!');
    err.type = 'notfound';
    return Promise.reject(err);
  }
  return {
    payload: {
      message: 'Contact retrieved successfully!',
      contact,
    },
    statusCode: 200,
  };
};
