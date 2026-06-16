type Props = {
  totalArticles: number;
  activeSources: number;
  primarySource: string;
};

export default function StatsBar({
  totalArticles,
  activeSources,
  primarySource,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div className="stat-card">
        <h2>{totalArticles}</h2>
        <p>Articles</p>
      </div>

      <div className="stat-card">
        <h2>{activeSources}</h2>
        <p>Data Sources</p>
      </div>

      <div className="stat-card">
        <h2>{primarySource}</h2>
        <p>Leading Source</p>
      </div>

      <div className="stat-card">
        <h2>Live</h2>
        <p>Sync Status</p>
      </div>
    </div>
  );
}