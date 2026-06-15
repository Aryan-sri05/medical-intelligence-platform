import { Router } from "express";
import { fetchClinicalTrials } from "./clinicaltrials.service";

const router = Router();

router.get(
  "/search",
  async (_, res) => {
    const data =
      await fetchClinicalTrials();

    res.json(data);
  }
);

export default router;