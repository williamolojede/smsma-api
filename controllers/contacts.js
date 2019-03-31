import models from '../models';

const { Contact, Message } = models;

export const createContact = async (req) => {
  const contact = await Contact.create(req.body);

  return {
    payload: {
      message: 'Contact created successfully!',
      data: contact,
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
      data: contact,
    },
    statusCode: 200,
  };
};

export const updateContact = async (req) => {
  const { params, body } = req;
  const contact = await Contact.findByPk(params.id);

  if (!contact) {
    const err = new Error('Contact not found!');
    err.type = 'notfound';
    return Promise.reject(err);
  }

  await contact.update(body);

  return {
    payload: {
      message: 'Contact updated successfully!',
      data: contact,
    },
    statusCode: 200,
  };
};

export const deleteContact = async (req) => {
  const { id } = req.params;
  const contact = await Contact.destroy({ where: { id } });

  if (contact === 0) {
    const err = new Error('Contact not found!');
    err.type = 'notfound';
    return Promise.reject(err);
  }

  return {
    payload: {
      message: 'Contact deleted successfully!',
    },
    statusCode: 200,
  };
};
