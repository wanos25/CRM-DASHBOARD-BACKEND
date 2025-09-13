import { Router } from 'express';
import auth from './auth';
import clients from './clients';
import projects from './projects';
import reportRoutes from "./reportRoutes"
const router = Router();
router.use('/auth', auth);
router.use('/clients', clients);
router.use('/projects', projects);
router.use("/reports", reportRoutes)
export default router;
