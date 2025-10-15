import express from "express";
import {adminDashboard, addSermon, addTag, addTagPage} from "../controllers/admin.controllers.js"

const router = express.Router();


router.get("", adminDashboard);
router.get("/addSermon", addSermon)
router.get("/addTag", addTagPage)
router.post("/addTag", addTag)
export default router;
