import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import bookController from '../../controllers/book/book.controller';

// Schema
import bookSchema from '../../validations/schemas/book.schema';

// Middleware
import { isAdmin } from '../../middlewares/permission-handler.middleware';

const router = express.Router();

router.post(
  '/',
  isAdmin(),
  schemaValidator(bookSchema.book),
  bookController.add,
);

router.get('/', bookController.list);

router.get('/:id', bookController.get);

router.put(
  '/:id',
  isAdmin(),
  schemaValidator(bookSchema.book),
  bookController.update,
);

router.put(
  '/:id/stock',
  isAdmin(),
  schemaValidator(bookSchema.updateStock),
  bookController.updateStock,
);

router.delete('/:id', isAdmin(), bookController.remove);

export default router;
