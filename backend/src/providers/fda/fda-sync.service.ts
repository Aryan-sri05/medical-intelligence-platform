import { prisma } from "../../prisma";
import { fetchFDAArticles } from "./fda.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncFDA() {
  const data = await fetchFDAArticles();

  const results = data.results || [];

  let inserted = 0;

  for (const item of results) {
    const product =
      item.products?.[0];

    const title =
      product?.brand_name ||
      "FDA Drug Update";

    const summary =
      item.sponsor_name ||
      "FDA Announcement";

    const articleUrl =
  `https://open.fda.gov/apis/drug/drugsfda/#${item.application_number}`;
  
  console.log(
  "APP NUMBER:",
  item.application_number
);
  
  const exists =
  await prisma.article.findFirst({
    where: {
      articleUrl,
    },
  });

  console.log(results[0]);
    if (exists) continue;

    const submissionDate =
  item.submissions?.[0]
    ?.submission_status_date;

const publishedAt =
  submissionDate
    ? new Date(
        submissionDate.replace(
          /(\d{4})(\d{2})(\d{2})/,
          "$1-$2-$3"
        )
      )
    : null;

    const imageUrl =
  await getUnsplashImage(
    `${title} pharmaceutical`
  );

    await prisma.article.create({
      data: {
        title,
        summary,
        sourceName: "FDA",
        sourceUrl:
          "https://open.fda.gov",
        articleUrl,
        category: "Regulatory",
         publishedAt,
        imageUrl,
      },
    });

    inserted++;
  }

  return {
    fetched: results.length,
    inserted,
  };
}