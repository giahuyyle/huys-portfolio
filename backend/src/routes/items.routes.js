import { Router } from "express";
import { getAllItems, getItemByKey } from "../controllers/items.controller.js";
const router = Router();

router.get("/", getAllItems);
router.get("/:key", getItemByKey);

export default router;
