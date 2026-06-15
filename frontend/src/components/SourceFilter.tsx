type Props = {
  selectedSource: string;
  onSourceChange: (
    source: string
  ) => void;
  sources: string[];
};

export default function SourceFilter({
  selectedSource,
  onSourceChange,
  sources,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        flexWrap: "wrap",
      }}
    >
      {sources.map((source) => (
        <button
          key={source}
          onClick={() => onSourceChange(source)}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            background:
              selectedSource === source
                ? "#0d6efd"
                : "#e9ecef",
            color:
              selectedSource === source
                ? "white"
                : "black",
          }}
        >
          {source}
        </button>
      ))}
    </div>
  );
}