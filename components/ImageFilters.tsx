"use client"

interface Props {
  filter: string
  setFilter: (val: string) => void
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
  ]

  return (
    <div className="flex gap-2 items-center">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`px-3 py-1.5 text-xs rounded-lg font-medium whitespace-nowrap transition-all ${
            filter === f.value
              ? "bg-white text-black shadow-lg"
              : "bg-[#2d2d2d] text-[var(--color-text-secondary)] border border-[#3d3d3d] hover:border-[#4d4d4d] hover:text-white"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
