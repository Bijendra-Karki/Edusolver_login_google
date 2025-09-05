import { testMsg } from "../controller/testcontroller.js";
import express from "express";

const router = express.Router();

router.get("/msg", testMsg);

export default router;
