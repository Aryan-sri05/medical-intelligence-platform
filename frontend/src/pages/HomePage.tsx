import { useEffect, useState } from "react";
import { getArticles } from "../services/article.service";
import ArticleCard from "../components/ArticleCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StatsBar from "../components/StatsBar";


export default function HomePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [selectedCategory, setSelectedCategory] =
  useState("All");
  const [selectedSource, setSelectedSource] =
  useState("All");

  useEffect(() => {
  setPage(1);
}, [search]);

  useEffect(() => {
  setPage(1);
}, [selectedCategory]);

  useEffect(() => {
  setPage(1);
}, [selectedSource]);

  useEffect(() => {
  loadArticles();
}, [
  page,
  selectedCategory,
  selectedSource,
  search,
]);

const loadArticles = async () => {
  const response = await getArticles(
  page,
  selectedCategory,
  search,
  selectedSource
);

  setArticles(response.articles);
  setTotalPages(response.totalPages);
  setTotalArticles(response.total);
};



  const sourceCategoryMap: Record<string, string> = {
  PubMed: "Research",
  MedRxiv: "Research",
  BioRxiv: "Research",

  ClinicalTrials: "Clinical Trials",

  FDA: "Regulatory",

  CDC: "Drug Safety",

  WHO: "Guidelines",
};
const filteredArticles = articles.filter((article) => {
  const matchesSearch =
    article.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const articleCategory =
    sourceCategoryMap[
      article.sourceName
    ] || "Research";

  const matchesCategory =
    selectedCategory === "All" ||
    articleCategory === selectedCategory;

   

return (
  matchesSearch &&
  matchesCategory
);
});



const activeSources = 5;

const sourceCounts: Record<string, number> = {};

articles.forEach((article) => {
  sourceCounts[article.sourceName] =
    (sourceCounts[article.sourceName] || 0) + 1;
});

const primarySource = "PubMed";



return (
  <>
    <Header
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
  onSourceChange={setSelectedSource}
/>

    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <StatsBar
  totalArticles={totalArticles}
  activeSources={activeSources}
  primarySource={primarySource}
/>  
      <SearchBar
        value={search}
        onChange={setSearch}
      />







<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "30px",
    marginTop: "30px",
  }}
>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "2.8fr 1fr",
    gap: "30px",
    alignItems: "start",
  }}
>
      <div>
  <h2>Latest Medical News</h2>

  {filteredArticles.length === 0 ? (
  <p>No articles found.</p>
) : (
  filteredArticles.map((article) => (
    <ArticleCard
      key={article.id}
      title={article.title}
      summary={article.summary}
      sourceName={article.sourceName}
      articleUrl={article.articleUrl}
      publishedAt={article.publishedAt}
      imageUrl={article.imageUrl}
    />
  ))
)}
</div>


<div>
  <div
    style={{
      position: "sticky",
  top: "120px",
      background: "white",
      padding: "20px",
      borderRadius: "16px",
      marginBottom: "20px",
    }}
  >
    <h3>Top Sources</h3>

{Object.entries(sourceCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([source, count]) => (
    <p key={source}>
      {source} ({count})
    </p>
))}
  </div>

  <div
    style={{
          position: "sticky",
  top: "120px",
      background: "white",
      padding: "20px",
      borderRadius: "16px",
    }}
  >
    <h3>Trending Areas</h3>

    <p>Cardiology</p>
    <p>Oncology</p>
    <p>Neurology</p>
    <p>Diabetes</p>
    <p>Mental Health</p>
  </div>
</div>
</div>
</div>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginTop: "30px",
  }}
>
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    style={{
      padding: "10px 20px",
      cursor: page === 1 ? "not-allowed" : "pointer",
    }}
  >
    Previous
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    style={{
      padding: "10px 20px",
      cursor:
        page === totalPages
          ? "not-allowed"
          : "pointer",
    }}
  >
    Next
  </button>
</div>
    </div>
  </>
);
}