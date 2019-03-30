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
      id: Joi.number().required(),
    },
  },
};
