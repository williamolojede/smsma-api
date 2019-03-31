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
