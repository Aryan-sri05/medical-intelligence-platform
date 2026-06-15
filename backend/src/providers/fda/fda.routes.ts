import { Router } from "express";
import { fetchFDAArticles } from "./fda.service";

const router = Router();

router.get("/search", async (req, res) => {
  const data = await fetchFDAArticles();

  res.json(data);
});

export default router;