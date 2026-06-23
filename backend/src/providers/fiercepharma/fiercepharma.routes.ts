import { Router } from "express";
import { syncFiercePharma } from "./fiercepharma-sync.service";

const router = Router();

router.get("/", async (_, res) => {
  const result =
    await syncFiercePharma();

  res.json(result);
});

export default router;