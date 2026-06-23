import cron from "node-cron";

import { syncPubMedArticles } from "../providers/pubmed/pubmed-sync.service";
import { syncMedRxiv } from "../providers/medrxiv/medrxiv-sync.service";
import { syncBioRxiv } from "../providers/biorxiv/biorxiv-sync.service";
import { syncFDA } from "../providers/fda/fda-sync.service";
import { syncWHOArticles } from "../providers/who/who-sync.service";
import { syncCDC } from "../providers/cdc/cdc-sync.service";
import { syncClinicalTrials } from "../providers/clinicaltrials/clinicaltrials-sync.service";
import { syncFiercePharma } from "../providers/fiercepharma/fiercepharma-sync.service";
import { syncEMA } from "../providers/ema/ema-sync.service";
import { syncMHRA } from "../providers/mhra/mhra-sync.service";
import { syncPharmaTimes } from "../providers/pharmatimes/pharmatimes-sync.service";

export const startAutoSync = () => {
  console.log("Auto Sync Scheduler Started");

  (async () => {
  try {
    console.log("Initial startup sync");

    await Promise.all([
  syncPubMedArticles(),
  syncMedRxiv(),
  syncBioRxiv(),
  syncFDA(),
  syncWHOArticles(),
  syncCDC(),
  syncClinicalTrials(),
  syncFiercePharma(),
  syncEMA(),
  syncMHRA(),
  syncPharmaTimes(),
]);

    console.log("Startup sync complete");
  } catch (error) {
    console.error(error);
  }
})();
  cron.schedule("*/30 * * * *", async () => {
    try {
      console.log("Starting scheduled sync...");

      await syncPubMedArticles();
      await syncMedRxiv();
      await syncBioRxiv();
      await syncFDA();
      await syncWHOArticles();
      await syncCDC();
      await syncClinicalTrials();
      await syncFiercePharma();
      await syncEMA();
      await syncMHRA();
      await syncPharmaTimes();
      console.log("Scheduled sync completed");
    } catch (error) {
      console.error("Auto Sync Failed:", error);
    }
  });
};