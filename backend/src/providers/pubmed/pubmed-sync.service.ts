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
      publishedAt: article.pubdate
        ? new Date(article.pubdate)
        : null,
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