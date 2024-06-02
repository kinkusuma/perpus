import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import memberController from '../../controllers/member/member.controller';

// Schema
import memberSchema from '../../validations/schemas/member.schema';

// Middleware
import { isAdmin } from '../../middlewares/permission-handler.middleware';

const router = express.Router();

router.post('/', memberController.create);

router.get('/', memberController.getByUserId);

router.put(
  '/',
  schemaValidator(memberSchema.updateStatusMember),
  memberController.update,
);

router.post(
  '/penaltize',
  isAdmin(),
  schemaValidator(memberSchema.penaltizeMember),
  memberController.penaltize,
);

router.get('/all', isAdmin(), memberController.list);

export default router;
