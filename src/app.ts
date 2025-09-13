import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth"
import clientRoutes from "./routes/clients"
import projectRoutes from "./routes/projects"
import reportRoutes from "./routes/reportRoutes";

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/reports", reportRoutes);
app.use("/api", authRoutes)
app.use("/api", clientRoutes)
app.use("/api", projectRoutes)
app.use("/api", reportRoutes)

export default app
