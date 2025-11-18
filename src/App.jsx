import { useState } from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import ResultTabs from "./components/ResultTabs";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid gap-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Discover your sign’s personality and future outlook
            </h2>
            <p className="text-gray-700">
              Enter your name and date of birth for a tailored reading across love, career, and personal growth.
            </p>
          </div>

          <InputForm onResult={setResult} />

          {result && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{result.symbol}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {result.name}, you’re a {result.sign}
                  </h3>
                  <p className="text-gray-600 text-sm">Based on your date of birth</p>
                </div>
              </div>

              <ResultTabs result={result} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
