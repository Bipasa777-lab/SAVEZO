export default function ProfileGrid() {
  const items = [
    "🏙️",
    "🌊",
    "🤖",
    "📊",
    "🔬",
    "🌱",
    "🧠",
    "🎯",
    "📡",
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {items.map((item, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl bg-[#0d1320] flex items-center justify-center text-3xl hover:scale-105 transition cursor-pointer"
        >
          {item}
        </div>
      ))}
    </div>
  );
}