import express from "express";
import signup from "../Controlar/auth.controlar.js";


const router = express.Router();

router.post("/signup", signup)

export default router;