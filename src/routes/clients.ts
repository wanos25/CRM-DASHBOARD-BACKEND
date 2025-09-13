import { Router } from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/rbac';
import {
  createClient,
  listClients,
  getClient,
  updateClient,
  deleteClient
} from '../controllers/clientController';
const router = Router();
router.use(auth);
router.post('/', permit('ADMIN','MANAGER'), createClient);
router.get('/', permit('ADMIN','MANAGER','USER'), listClients);
router.get('/:id', permit('ADMIN','MANAGER','USER'), getClient);
router.put('/:id', permit('ADMIN','MANAGER'), updateClient);
router.delete('/:id', permit('ADMIN'), deleteClient);
export default router;
