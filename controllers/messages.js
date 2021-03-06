import { Sequelize } from 'sequelize';
import models from '../models';

const { Message, Contact } = models;
const { Op } = Sequelize;

export const createMessage = async (req) => {
  const message = await Message.create(req.body);
  return {
    payload: {
      message: 'Message created successfully!',
      data: message,
    },
    statusCode: 201,
  };
};

export const getMessages = async (req) => {
  const { contactId, type = 'all' } = req.query;

  const contact = await Contact.findByPk(contactId);

  if (!contact) {
    const err = new Error('Contact not found!');
    err.type = 'notfound';
    return Promise.reject(err);
  }

  const where = {
    all: {
      [Op.or]: [{ senderId: contactId }, { receiverId: contactId }],
    },
    sent: { senderId: contactId },
    received: { receiverId: contactId },
  }[type];

  const messages = await Message.findAll({ where });

  return {
    payload: {
      data: messages,
    },
    statusCode: 200,
  };
};

export const deleteMessage = async (req) => {
  const { messageId } = req.params;
  const message = await Message.destroy({ where: { id: messageId } });

  if (message === 0) {
    const err = new Error('Message not found!');
    err.type = 'notfound';
    return Promise.reject(err);
  }

  return {
    payload: {
      message: 'Message deleted successfully!',
    },
    statusCode: 200,
  };
};
