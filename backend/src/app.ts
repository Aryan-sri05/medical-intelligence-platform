import express from "express";
import cors from "cors";

import articleRoutes from "./routes/article.routes";
import pubmedRoutes from "./routes/pubmed.routes";
import syncRoutes from "./routes/sync.routes";
import clinicalTrialsRoutes from "./providers/clinicaltrials/clinicaltrials.routes";
import fdaRoutes from "./providers/fda/fda.routes";
import cdcRoutes from "./providers/cdc/cdc.routes";
import medrxivRoutes from "./providers/medrxiv/medrxiv.routes";
import biorxivRoutes from "./providers/biorxiv/biorxiv.routes";
import { startAutoSync } from "./jobs/sync.job";

const app = express();

app.use(cors());
app.use(express.json());
startAutoSync();
app.get("/", (req, res) => {
  res.send("Medical News API Running");
});

app.use("/articles", articleRoutes);
app.use("/pubmed", pubmedRoutes);
app.use("/sync", syncRoutes);
app.use(
  "/clinicaltrials",
  clinicalTrialsRoutes
);

app.use("/fda", fdaRoutes);
app.use("/cdc", cdcRoutes);
app.use("/medrxiv", medrxivRoutes);
app.use("/biorxiv", biorxivRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});