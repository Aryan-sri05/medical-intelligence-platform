import axios from "axios";

export async function fetchBioRxivArticles() {
  const response = await axios.get(
    "https://api.biorxiv.org/details/biorxiv/2026-01-01/2026-12-31"
  );

  return response.data;
}