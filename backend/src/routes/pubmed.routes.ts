import { Router } from "express";
import { fetchPubMedArticles } from "../providers/pubmed/pubmed.service";

const router = Router();

router.get("/", async (req, res) => {
  const data = await fetchPubMedArticles();
  res.json(data);
});

export default router;