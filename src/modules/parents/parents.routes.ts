import { Router } from 'express';
import * as parentsController from './parents.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', parentsController.getAllParents);
router.get('/:id', parentsController.getParentById);
router.get('/view/:link', parentsController.getParentByLink);
router.post('/', parentsController.createParent);
router.put('/:id', parentsController.updateParent);
router.delete('/:id', parentsController.deleteParent);

export default router;
