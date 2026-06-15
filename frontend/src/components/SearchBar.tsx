type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div
      style={{
        marginBottom: "25px",
      }}
    >
      <input
        type="text"
        placeholder="Search research papers, clinical trials, FDA updates..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "18px 24px",
          borderRadius: "50px",
          border: "1px solid #dbe2ea",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
          background: "white",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.05)",
        }}
      />
    </div>
  );
}