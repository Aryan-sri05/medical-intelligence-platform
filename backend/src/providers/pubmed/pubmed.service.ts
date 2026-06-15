import axios from "axios";

export const fetchPubMedArticles = async () => {
  const searchResponse = await axios.get(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi",
    {
      params: {
        db: "pubmed",
        term: "medicine",
        retmode: "json",
        retmax: 10,
      },
    }
  );

  const ids = searchResponse.data.esearchresult.idlist.join(",");

  const detailResponse = await axios.get(
    "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi",
    {
      params: {
        db: "pubmed",
        id: ids,
        retmode: "json",
      },
    }
  );

  return detailResponse.data;
};