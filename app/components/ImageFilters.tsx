"use client";

interface Props {
  filter: string;
  setFilter: (val: string) => void;
}

export default function ImageFilters({ filter, setFilter }: Props) {
  const filters = [
    { value: "none", label: "None" },
    { value: "grayscale", label: "Grayscale" },
    { value: "sepia", label: "Sepia" },
    { value: "blur", label: "Blur" },
    { value: "brightness", label: "Bright" },
    { value: "contrast", label: "Contrast" },
    { value: "saturate", label: "Saturate" },
    { value: "invert", label: "Invert" },
  ];

  return (
    <div className="flex gap-2 items-center">
      <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
        Filter:
      </span>
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1 text-xs rounded transition ${
              filter === f.value
                ? "bg-white text-black font-semibold"
                : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}