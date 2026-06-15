// src/providers/cdc/cdc.routes.ts

import { Router } from "express";
import { fetchCDCArticles } from "./cdc.service";

const router = Router();

router.get("/search", async (req, res) => {
  const data = await fetchCDCArticles();
  res.json(data);
});

export default router;