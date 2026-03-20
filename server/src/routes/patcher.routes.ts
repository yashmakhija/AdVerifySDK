import { Router } from 'express';
import multer from 'multer';
import { adminAuth, requireActivePlan } from '../middleware/auth';
import { PatcherController } from '../controllers/patcher.controller';

const router = Router();
const ctrl = new PatcherController();

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
});

router.use(adminAuth, requireActivePlan);

router.post('/', upload.single('apk'), (req, res) => ctrl.patchApk(req, res));
router.get('/download/:id', (req, res) => ctrl.downloadPatched(req, res));

export default router;
