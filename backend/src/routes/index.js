import { Router } from "express";

// Import route modules
import itemsRoutes from "./items.routes.js";
import locationsRoutes from "./locations.routes.js";

const router = Router();

router.use("/items", itemsRoutes);
router.use("/locations", locationsRoutes);

export default router;