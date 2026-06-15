import { Router } from "express";
import { fetchBioRxivArticles } from "./biorxiv.service";

const router = Router();

router.get("/search", async (req, res) => {
  const data =
    await fetchBioRxivArticles();

  res.json(data);
});

export default router;