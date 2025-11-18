import { useState } from "react";

export default function InputForm({ onResult }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND = import.meta.env.VITE_BACKEND_URL || "";

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !dob) {
      setError("Please provide both your name and date of birth.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/astrology/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob }),
      });
      if (!res.ok) throw new Error("Failed to fetch prediction");
      const data = await res.json();
      onResult(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur rounded-xl p-5 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Alex"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-md bg-purple-600 text-white px-4 py-2 font-medium hover:bg-purple-700 transition disabled:opacity-60"
      >
        {loading ? "Generating..." : "Get my reading"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
