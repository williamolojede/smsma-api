import models from '../models';

const { Message } = models;

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
