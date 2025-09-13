import { Router } from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/rbac';
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject
} from '../controllers/projectController';
const router = Router();
router.use(auth);
router.post('/', permit('ADMIN','MANAGER'), createProject);
router.get('/', permit('ADMIN','MANAGER','USER'), listProjects);
router.get('/:id', permit('ADMIN','MANAGER','USER'), getProject);
router.put('/:id', permit('ADMIN','MANAGER'), updateProject);
router.delete('/:id', permit('ADMIN'), deleteProject);
export default router;
