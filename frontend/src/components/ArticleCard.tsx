type Props = {
  title: string;
  summary: string;
  sourceName: string;
  articleUrl: string;
  publishedAt?: string;
  imageUrl?: string;
};

export default function ArticleCard({
  title,
  summary,
  sourceName,
  articleUrl,
  publishedAt,
  imageUrl,
}: Props) {

const formattedDate = publishedAt
  ? new Date(publishedAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  : "Unknown";

  return (
    <div
style={{
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
}}
    >

<div
  style={{
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#eef2ff",
    color: "#4338ca",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "12px",
  }}
>
  {sourceName}
</div>

  {imageUrl && (
  <img
    src={imageUrl}
    alt={title}
    style={{
      width: "100%",
      height: "240px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "15px",
    }}
  />
)}

<h2
  style={{
    color: "#0f172a",
    marginBottom: "15px",
    lineHeight: 1.4,
  }}
>
  {title}
</h2>
      <p>{
summary?.length > 300
  ? summary.substring(0, 300) + "..."
  : summary
}</p>

      <div
  style={{
    display: "flex",
    gap: "20px",
    marginTop: "15px",
    marginBottom: "15px",
    fontSize: "14px",
    color: "#666",
  }}
>


  <span>
    <strong>Source:</strong> {sourceName}
  </span>

  <span>
    <strong>Published:</strong> {formattedDate}
  </span>
</div>



      <a
        href={articleUrl}
        target="_blank"
        rel="noreferrer"
      >
        Read Original Article →
      </a>
    </div>
  );
}