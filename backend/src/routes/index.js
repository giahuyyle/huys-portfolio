import { Router } from "express";

// Import route modules
import itemsRoutes from "./items.routes.js";
import locationsRoutes from "./locations.routes.js";
import settingsRoutes from "./settings.routes.js";
import windowsRoutes from "./windows.routes.js";

const router = Router();

router.use("/items", itemsRoutes);
router.use("/locations", locationsRoutes);
router.use("/settings", settingsRoutes);
router.use("/windows", windowsRoutes);

export default router;