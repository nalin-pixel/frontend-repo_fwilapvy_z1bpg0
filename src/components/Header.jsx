import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-white/20 bg-white/60 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
        <Sparkles className="text-purple-600" />
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Astrology Insights</h1>
          <p className="text-xs text-gray-600">Reflective guidance for your sign</p>
        </div>
      </div>
    </header>
  );
}
