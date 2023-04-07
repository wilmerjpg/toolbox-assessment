import { Router } from 'express';
import { getFilesData } from '../controllers/files.js';

const router = Router();

router.get('/data', getFilesData);

export default router;
