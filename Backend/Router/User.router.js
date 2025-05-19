import express from "express";
import { test } from "../Controlar/User.controlar.js";
const router = express.Router();   

router.get("/test",test )

export default router;