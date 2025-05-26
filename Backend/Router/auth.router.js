import express from "express";
import signup  from "../Controlar/auth.controlar.js";
import { signin } from "../Controlar/auth.controlar.js";




const router = express.Router();

router.post("/signup", signup)
router.post("/signin", signin)


export default router;