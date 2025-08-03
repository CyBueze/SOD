import express from "express";
import { showLogin, processLogin } from "../controllers/authController.js";

const router = express.Router();

router.get("", (req, res)=>{
  res.render("index", {title: "School of Destiny International"})
})
router.get("/login", showLogin);
router.post("/login", processLogin)
export default router;
