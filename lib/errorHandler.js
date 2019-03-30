const extractMessageAndType = (err) => {
  let message;
  let type;

  if (err.errors) {
    ([{ message, type }] = err.errors);
  } else {
    ({ message, type = 'default' } = err);
  }

  return { message, type };
};

const errorResponseFactory = (err, statusCode) => {
  const { message, type } = extractMessageAndType(err);
  const newErr = new Error(message);
  newErr.statusCode = statusCode;
  newErr.stack = err.stack;
  newErr.type = type;
  return newErr;
};

const errorHandler = (err, next) => {
  const { type } = extractMessageAndType(err);

  const error = {
    'unique violation': errorResponseFactory(err, 409),
    'notNull Violation': errorResponseFactory(err, 400),
    notfound: errorResponseFactory(err, 404),
    default: errorResponseFactory(err, 500),
  }[type];

  next(error);
};

export default errorHandler;
