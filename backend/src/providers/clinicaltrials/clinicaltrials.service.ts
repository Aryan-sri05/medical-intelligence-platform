import axios from "axios";

export async function fetchClinicalTrials() {
  const response = await axios.get(
    "https://clinicaltrials.gov/api/v2/studies",
    {
      params: {
        "query.cond": "Heart Disease",
        pageSize: 10,
      },
    }
  );

  return response.data;
}