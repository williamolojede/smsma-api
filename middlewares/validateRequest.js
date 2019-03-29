import Joi from 'joi';

const validateRequest = schema => (req, res, next) => {
  const valx = Object.entries(schema);

  for (let i = 0; i < valx.length; i += 1) {
    const [key, val] = valx[i];
    if (req[key]) {
      const { error } = Joi.validate(req[key], val);

      if (error) {
        const { details } = error;
        const err = new Error(details[0].message);
        err.statusCode = 400;
        next(err);
        return;
      }
    }
  }

  next();
};

export default validateRequest;
