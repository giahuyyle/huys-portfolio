import { Router } from "express";
import { getAllItems, getItem } from "../controllers/items.controller.js";
const router = Router();

router.get("/", getAllItems);
router.get("/:id", getItem);

export default router;
