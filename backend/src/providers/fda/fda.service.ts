import axios from "axios";

export async function fetchFDAArticles() {
  const response = await axios.get(
    "https://api.fda.gov/drug/drugsfda.json",
    {
      params: {
        limit: 10,
      },
    }
  );

  return response.data;
}