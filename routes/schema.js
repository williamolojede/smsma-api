import Joi from 'joi';

export default {
  createContact: {
    body: Joi.object().keys({
      phone: Joi.string().required().length(11).regex(/^\d{11}$/).trim(),
      name: Joi.string().required().min(2).max(20).trim(),
    }),
  },
  getContact: {
    params: {
      contactId: Joi.number().required(),
    },
  },
  updateContact: {
    params: {
      contactId: Joi.number().required(),
    },
    body: Joi.object().keys({
      phone: Joi.string().length(11).regex(/^\d{11}$/).trim(),
      name: Joi.string().min(2).max(20).trim(),
    }).or('phone', 'name'),
  },
  deleteContact: {
    params: {
      contactId: Joi.number().required(),
    },
  },
  createMessage: {
    body: Joi.object().keys({
      receiverId: Joi.number().required(),
      content: Joi.string().required().trim(),
      senderId: Joi.number().required(),
    }),
  },
  deleteMessage: {
    params: {
      messageId: Joi.number().required(),
    },
  },
};
