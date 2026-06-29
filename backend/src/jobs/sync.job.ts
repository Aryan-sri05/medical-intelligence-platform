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
import { syncCDSCO } from "../providers/cdsco/cdsco-sync.service";


export const startAutoSync = () => {
  console.log("Auto Sync Scheduler Started");

  (async () => {
  try {
    console.log("Initial startup sync");

    await Promise.allSettled([
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
  syncCDSCO(),
]);

    console.log("Startup sync complete");
  } catch (error) {
    console.error(error);
  }
})();
  cron.schedule("*/30 * * * *", async () => {
    try {
      console.log("Starting scheduled sync...");

     const jobs = [
  syncPubMedArticles,
  syncMedRxiv,
  syncBioRxiv,
  syncFDA,
  syncWHOArticles,
  syncCDC,
  syncClinicalTrials,
  syncFiercePharma,
  syncEMA,
  syncMHRA,
  syncPharmaTimes,
  syncCDSCO,
];

for (const job of jobs) {
  try {
    await job();
  } catch (error) {
    console.error(`${job.name} failed`, error);
  }
}
      console.log("Scheduled sync completed");
    } catch (error) {
      console.error("Auto Sync Failed:", error);
    }
  });
};