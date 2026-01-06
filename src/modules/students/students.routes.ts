import { Router } from 'express';
import { create, getAll, getById, getByLink, update, remove, getAnalytics, setLink } from './students.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';

const router = Router();

// Public route for student dashboard access
router.get('/link/:link', getByLink);

// Allow setting a custom slug for a student (ADMIN/SECRETARY only)
// (kept below after auth + role middleware)

// All other routes require authentication
router.use(authMiddleware);

// Both ADMIN and SECRETARY can access students
router.use(roleMiddleware('ADMIN', 'SECRETARY'));

// Protected route to set a custom student link
router.post('/:id/link', setLink);

router.get('/analytics', getAnalytics);
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
