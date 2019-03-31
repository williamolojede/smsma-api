import models from '../models';

const { Contact } = models;

const validateCreateMessageIds = async (req, res, next) => {
  const { receiverId, senderId } = req.body;

  const [receiver, sender] = await Promise.all([
    Contact.findByPk(receiverId),
    Contact.findByPk(senderId),
  ]);

  let message;
  if (!receiver) message = 'Receiver not found!';
  if (!sender) message = 'Sender not found!';

  if (!receiver || !sender) {
    const err = new Error(message);
    err.statusCode = 404;
    return next(err);
  }

  return next();
};

export default validateCreateMessageIds;
