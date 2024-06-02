import express from 'express';
import borrowController from '../../controllers/borrow/borrow.controller';

const router = express.Router();

router.get('/', borrowController.record);

export default router;
