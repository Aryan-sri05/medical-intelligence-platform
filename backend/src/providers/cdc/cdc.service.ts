// src/providers/cdc/cdc.service.ts

import axios from "axios";

export async function fetchCDCArticles() {
  const response = await axios.get(
    "https://tools.cdc.gov/api/v2/resources/media"
  );

  return response.data;
}