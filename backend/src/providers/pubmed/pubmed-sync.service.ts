import axios from "axios";
import { prisma } from "../../prisma";
import { getUnsplashImage } from "../../services/unsplash.service";

export const syncPubMedArticles = async () => {
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

  const getValidPubMedDate = (
  pubdate: string | undefined,
  fetchedAt: Date
): Date => {
  if (!pubdate) {
    return fetchedAt;
  }

  const parsedDate = new Date(pubdate);

  // Invalid date
  if (isNaN(parsedDate.getTime())) {
    return fetchedAt;
  }

  const now = new Date();

  // Future publication date
  if (parsedDate > now) {
    return fetchedAt;
  }

  return parsedDate;
};

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

  const result = detailResponse.data.result;

  if (!result) {
  throw new Error("PubMed returned no result.");
}

  const articles = [];

  for (const key of Object.keys(result)) {
    if (key === "uids") continue;

    const article = result[key];

    articles.push({
      title: article.title || "No Title",
      summary: article.fulljournalname || "",
      sourceName: "PubMed",
      sourceUrl: "https://pubmed.ncbi.nlm.nih.gov",
      articleUrl: `https://pubmed.ncbi.nlm.nih.gov/${article.uid}/`,
      category: "Research",
      imageUrl: await getUnsplashImage(
  `${article.title} medicine`
),
      publishedAt: getValidPubMedDate(
  article.pubdate,
  new Date()
),
    });
  }

  let inserted = 0;

  for (const article of articles) {
    try {
      await prisma.article.create({
        data: article,
        
      });

      inserted++;
    } catch {
      // Ignore duplicates
    }
  }

  return {
    fetched: articles.length,
    inserted,
  };
};