const errorResponseFactory = (statusCode, message, type = null) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.type = type;
  return err;
};

const extractMessageAndType = (err) => {
  let message;
  let type;

  if (err.errors) {
    ([{ message, type }] = err.errors);
  } else {
    ({ message } = err);
    type = 'default';
  }
  return { message, type };
};

const errorHandler = (err, next) => {
  const { message, type } = extractMessageAndType(err);

  const errors = {
    'unique violation': errorResponseFactory(409, message),
    'notNull Violation': errorResponseFactory(400, message),
    default: errorResponseFactory(500, message),
  };
  const error = errors[type] || errorResponseFactory(500, message, type);

  next(error);
};

export default errorHandler;
