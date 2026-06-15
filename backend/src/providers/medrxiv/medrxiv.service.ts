// src/providers/medrxiv/medrxiv.service.ts

import axios from "axios";

export async function fetchMedRxivArticles() {
  const response = await axios.get(
    "https://api.biorxiv.org/details/medrxiv/2026-01-01/2026-12-31"
  );

  return response.data;
}