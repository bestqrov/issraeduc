import { Router } from 'express';
import * as teachersController from './teachers.controller';

const router = Router();

router.post('/', teachersController.createTeacher);
router.get('/', teachersController.getAllTeachers);
router.put('/:id', teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);
router.get('/view/:link', teachersController.getTeacherByLink);

export default router;
