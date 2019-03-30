import errorHandler from '../lib/errorHandler';

const asyncWrapMiddleware = fn => (req, res, next) => {
  fn(req, res)
    .then(({ statusCode, payload }) => {
      res.status(statusCode).send(payload);
    })
    .catch((err) => {
      errorHandler(err, next);
    });
};

export default asyncWrapMiddleware;
