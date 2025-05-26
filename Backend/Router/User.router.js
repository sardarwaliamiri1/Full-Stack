import express from "express";
import { test } from "../Controlar/User.controlar.js";
import { Update } from "../Controlar/User.controlar.js";
import VerifyUser from "../Utlies/VerifyUser.js";
const router = express.Router();   

router.get("/test",test )
router.post("/update/:id",VerifyUser ,Update)

export default router;