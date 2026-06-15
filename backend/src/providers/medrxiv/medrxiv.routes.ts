// src/providers/medrxiv/medrxiv.routes.ts

import { Router } from "express";
import { fetchMedRxivArticles } from "./medrxiv.service";

const router = Router();

router.get("/search", async (req, res) => {
  const data = await fetchMedRxivArticles();

  res.json(data);
});

export default router;