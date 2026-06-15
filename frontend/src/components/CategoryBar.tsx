type Props = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function CategoryBar({
  selectedCategory,
  onCategoryChange,
}: Props) {
  const categories = [
    "All",
    "Research",
    "Clinical Trials",
    "Drug Safety",
    "Regulatory",
    "Guidelines",
    "Industry",
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "25px",
        marginBottom: "25px",
        borderBottom: "1px solid #e2e8f0",
        paddingBottom: "12px",
        fontWeight: 600,
        color: "#334155",
      }}
    >
      {categories.map((category) => (
        <span
          key={category}
          onClick={() =>
            onCategoryChange(category)
          }
          style={{
            cursor: "pointer",
            color:
              selectedCategory === category
                ? "#1e40af"
                : "#475569",
            borderBottom:
              selectedCategory === category
                ? "3px solid #14b8a6"
                : "none",
            paddingBottom: "10px",
          }}
        >
          {category}
        </span>
      ))}
    </div>
  );
}