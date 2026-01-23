import { Router } from "express";

// Import route modules
import itemsRoutes from "./items.routes.js";
import settingsRoutes from "./settings.routes.js";

const router = Router();

router.use("/items", itemsRoutes);
router.use("/settings", settingsRoutes);

export default router;