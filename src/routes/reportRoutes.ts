import { Router } from "express"
import auth from "../middleware/auth"
import permit from "../middleware/rbac"
import {
  createReport,
  listReports,
  getReport,
  updateReport,
  deleteReport
} from "../controllers/reportController"

const router = Router()
router.use(auth)
router.post("/", permit("ADMIN", "MANAGER"), createReport)
router.get("/", permit("ADMIN", "MANAGER", "USER"), listReports)
router.get("/:id", permit("ADMIN", "MANAGER", "USER"), getReport)
router.put("/:id", permit("ADMIN", "MANAGER"), updateReport)
router.delete("/:id", permit("ADMIN"), deleteReport)

export default router
