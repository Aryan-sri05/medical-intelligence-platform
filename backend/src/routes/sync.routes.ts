import { Router } from "express";
import { syncPubMedArticles } from "../providers/pubmed/pubmed-sync.service";
import { syncWHOArticles } from "../providers/who/who-sync.service";
import { syncClinicalTrials } from "../providers/clinicaltrials/clinicaltrials-sync.service";
import { syncFDA } from "../providers/fda/fda-sync.service";
import { syncCDC } from "../providers/cdc/cdc-sync.service";
import { syncMedRxiv } from "../providers/medrxiv/medrxiv-sync.service";
import { syncBioRxiv } from "../providers/biorxiv/biorxiv-sync.service";

const router = Router();

router.get("/pubmed", async (req, res) => {
  try {
    const result = await syncPubMedArticles();

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Sync Failed",
    });
  }
});

router.get("/who", async (req, res) => {
  const result =
    await syncWHOArticles();

  res.json(result);
});

router.get(
  "/clinicaltrials",
  async (req, res) => {
    const result =
      await syncClinicalTrials();

    res.json(result);
  }
);

router.get(
  "/fda",
  async (req, res) => {
    const result =
      await syncFDA();

    res.json(result);
  }
);

router.get(
  "/cdc",
  async (req, res) => {
    const result =
      await syncCDC();

    res.json(result);
  }
);

router.get(
  "/medrxiv",
  async (req, res) => {
    const result =
      await syncMedRxiv();

    res.json(result);
  }
);

router.get(
  "/biorxiv",
  async (req, res) => {
    const result =
      await syncBioRxiv();

    res.json(result);
  }
);



export default router;