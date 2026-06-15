import { prisma } from "../../prisma";
import { fetchClinicalTrials } from "./clinicaltrials.service";
import { getUnsplashImage } from "../../services/unsplash.service";

export async function syncClinicalTrials() {
  const data = await fetchClinicalTrials();

  const studies = data.studies || [];

  let inserted = 0;

  for (const study of studies) {
    const title =
      study.protocolSection?.identificationModule
        ?.briefTitle || "No Title";

    const summary =
      study.protocolSection?.descriptionModule
        ?.briefSummary || "";

    const articleUrl =
      "https://clinicaltrials.gov/study/" +
      study.protocolSection?.identificationModule
        ?.nctId;

    const exists =
      await prisma.article.findFirst({
        where: { articleUrl },
      });

      console.log(studies[0]);
    if (exists) continue;

    const publishedAt =
  study.protocolSection
    ?.statusModule
    ?.lastUpdateSubmitDate
    ? new Date(
        study.protocolSection
          .statusModule
          .lastUpdateSubmitDate
      )
    : null;

    const imageUrl =
  await getUnsplashImage(
    `${title} clinical trial`
  );

    await prisma.article.create({
      data: {
        title,
        summary,
        sourceName: "ClinicalTrials",
        sourceUrl:
          "https://clinicaltrials.gov",
        articleUrl,
        category: "Clinical Trials",
        publishedAt,
        imageUrl,
      },
    });

    inserted++;
  }

  return {
    fetched: studies.length,
    inserted,
  };
}