import { useMemo, useState } from "react";
import { Heart, Briefcase, Sparkle, Stars } from "lucide-react";

function Section({ block }) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900">{block.title}</h3>
      <ul className="list-disc pl-6 space-y-1 text-gray-700">
        {block.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ResultTabs({ result }) {
  const [active, setActive] = useState("personality");
  const tabs = useMemo(
    () => [
      { key: "personality", label: "Personality", icon: Stars },
      { key: "future", label: "Future", icon: Sparkle },
      { key: "love", label: "Love", icon: Heart },
      { key: "career", label: "Career", icon: Briefcase },
    ],
    []
  );

  if (!result) return null;

  return (
    <div className="bg-white/70 backdrop-blur rounded-xl p-5 shadow-sm">
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border transition ${
              active === key
                ? "bg-purple-600 text-white border-transparent"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {active === "personality" && (
        <div className="space-y-6">
          {result.personality.map((block, i) => (
            <Section key={i} block={block} />
          ))}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Potential Matches</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {result.matches.map((m, i) => (
                <li key={i}>
                  <span className="font-medium">{m.sign}</span>: {m.reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {active === "future" && (
        <div className="space-y-6">
          <Section block={result.future.growth} />
          <p className="text-sm text-gray-500">{result.disclaimer}</p>
        </div>
      )}

      {active === "love" && (
        <div className="space-y-6">
          <Section block={result.future.love} />
          <p className="text-sm text-gray-500">{result.disclaimer}</p>
        </div>
      )}

      {active === "career" && (
        <div className="space-y-6">
          <Section block={result.future.career} />
          <p className="text-sm text-gray-500">{result.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
