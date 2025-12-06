"use client";

interface Props {
  font: string;
  setFont: (val: string) => void;
}

export default function FontPicker({ font, setFont }: Props) {
  const fonts = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Courier New, monospace", label: "Courier" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Times New Roman, serif", label: "Times" },
    { value: "Impact, sans-serif", label: "Impact" },
  ];

  return (
    <div>
      <label className="block text-xs font-semibold mb-2 text-neutral-400 uppercase tracking-wider">
        Font
      </label>
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded text-sm focus:outline-none focus:border-neutral-500"
      >
        {fonts.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}