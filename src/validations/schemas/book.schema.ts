import joi from 'joi';

export default {
  book: {
    body: {
      code: joi.string().required(),
      title: joi.string().required(),
      author: joi.string().required(),
      stock: joi.number().required(),
    },
  },
  updateStock: {
    body: {
      stock: joi.number().min(1).required(),
    },
  },
};
