import { Router } from "express";
import { syncPubMedArticles } from "../providers/pubmed/pubmed-sync.service";
import { syncWHOArticles } from "../providers/who/who-sync.service";
import { syncClinicalTrials } from "../providers/clinicaltrials/clinicaltrials-sync.service";
import { syncFDA } from "../providers/fda/fda-sync.service";
import { syncCDC } from "../providers/cdc/cdc-sync.service";
import { syncMedRxiv } from "../providers/medrxiv/medrxiv-sync.service";
import { syncBioRxiv } from "../providers/biorxiv/biorxiv-sync.service";
import { syncFiercePharma } from "../providers/fiercepharma/fiercepharma-sync.service";
import { syncEMA } from "../providers/ema/ema-sync.service";
import { syncMHRA } from "../providers/mhra/mhra-sync.service";
import { syncPharmaTimes } from "../providers/pharmatimes/pharmatimes-sync.service";
import { syncCDSCO } from "../providers/cdsco/cdsco-sync.service";

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

router.get(
  "/fiercepharma",
  async (_, res) => {
    const result =
      await syncFiercePharma();

    res.json(result);
  }
);

router.get(
  "/ema",
  async (_, res) => {
    const result =
      await syncEMA();

    res.json(result);
  }
);

router.get(
  "/mhra",
  async (_, res) => {
    const result =
      await syncMHRA();

    res.json(result);
  }
);

router.get(
  "/pharmatimes",
  async (_, res) => {
    const result =
      await syncPharmaTimes();

    res.json(result);
  }
);

router.get(
  "/cdsco",
  async (_, res) => {
    const result =
      await syncCDSCO();

    res.json(result);
  }
);



export default router;