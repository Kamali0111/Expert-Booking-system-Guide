import express from 'express';
import {
  getExperts,
  getExpertById,
  getAvailableSlots,
} from '../controllers/expertController.js';

const router = express.Router();

router.get('/', getExperts);
router.get('/:id', getExpertById);
router.get('/:id/slots', getAvailableSlots);

export default router;
