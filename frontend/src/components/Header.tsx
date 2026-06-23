import { useState, useEffect, useRef } from "react";

type Props = {
  selectedCategory: string;

  onCategoryChange: (
    category: string
  ) => void;

  onSourceChange: (
    source: string
  ) => void;
};

export default function Header({
  selectedCategory,
  onCategoryChange,
  onSourceChange,
}: Props) {

    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const menuRef = useRef<HTMLDivElement>(null);
    const menus = {
  Research: [
    "PubMed",
    "MedRxiv",
    "BioRxiv",
  ],

  "Clinical Trials": [
    "ClinicalTrials",
  ],

  Regulatory: [
    "FDA",
    "EMA",
    "CDSCO",
  ],

  "Drug Safety": [
    "CDC",
    "MHRA",
  ],

  Guidelines: [
    "WHO",
  ],

  Industry: [
    "Fierce Pharma",
    "PharmaTimes",
  ],
};

useEffect(() => {
  const handleClickOutside = (
    event: MouseEvent
  ) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(
        event.target as Node
      )
    ) {
      setOpenMenu(null);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

  return (
    <header
      style={{
        background: "#07111f",
borderBottom: "1px solid #0f172a",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "18px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              color: "#ffffff",
            }}
          >
            Medical Intelligence
          </h1>

          <span
            style={{
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Research • Clinical Trials • Regulatory Updates
          </span>
        </div>

<div
  ref={menuRef}
  style={{
    display: "flex",
    gap: "28px",
    alignItems: "center",
    fontWeight: 500,
  }}
>
  <span
    onClick={() => {
  onCategoryChange("All");
  onSourceChange("All");
}}
    style={{
      cursor: "pointer",
      color:
        selectedCategory === "All"
          ? "#14b8a6"
          : "#e2e8f0",
      borderBottom:
        selectedCategory === "All"
          ? "2px solid #14b8a6"
          : "none",
      paddingBottom: "4px",
    }}
  >
    All
  </span>

  {Object.entries(menus).map(
    ([category, sources]) => (
      <div
        key={category}
        style={{
          position: "relative",
        }}
       onClick={() =>
  setOpenMenu(
    openMenu === category
      ? null
      : category
  )
}
      >
        <span
          onClick={() => {
  onCategoryChange(category);
  onSourceChange("All");
}}
          style={{
            cursor: "pointer",
            color:
              selectedCategory === category
                ? "#14b8a6"
                : "#e2e8f0",
            borderBottom:
              selectedCategory === category
                ? "2px solid #14b8a6"
                : "none",
            paddingBottom: "4px",
          }}
        >
          {category} ▼
        </span>

        {openMenu === category && (
          <div
            style={{
              position: "absolute",
              top: "35px",
              left: 0,
              background: "#fff",
              borderRadius: "12px",
              minWidth: "180px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,.15)",
              overflow: "hidden",
              zIndex: 999,
            }}
          >
            {sources.map((source) => (
              <div
  key={source}
  onClick={() => {
  onCategoryChange(category);
  onSourceChange(source);
  setOpenMenu(null);
}}
  style={{
    padding: "12px 16px",
    cursor: "pointer",
    color: "#1e293b",
  }}
>
  {source}
</div>
            ))}
          </div>
        )}
      </div>
    )
  )}
</div>
      </div>
    </header>
  );
}