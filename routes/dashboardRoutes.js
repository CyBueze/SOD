import express from "express";
import {requireAuth} from "../middlewares/auth.js"
import { mdDash, cashierDash } from "../controllers/dashboardController.js";

const router = express.Router();


router.get("/md", requireAuth, mdDash);
router.get("/cashier", requireAuth, cashierDash)
export default router;
