import React, { useEffect, useState } from "react";

function DidYouKnow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);

  // ✅ Fetch facts.json from public folder
  useEffect(() => {
    fetch("/facts.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.facts && data.facts.length > 0) {
          setFacts(data.facts);
        }
        setLoading(false);
      })
      .catch(() => {
        setFacts([]);
        setLoading(false);
      });
  }, []);

  // ✅ Slideshow - move to next fact every 5s
  useEffect(() => {
    if (facts.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % facts.length); // loop through all
        setFade(true);
      }, 500); // smooth transition
    }, 5000);

    return () => clearInterval(interval);
  }, [facts]);

  const currentFact = facts[currentIndex] || null;

  return (
    <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl shadow-lg p-6 text-white min-h-[300px] flex flex-col justify-between">
      
      {/* Heading */}
      <h3 className="text-2xl font-bold mb-3">💡 Did You Know?</h3>

      {/* ✅ Loading State */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-purple-100 italic opacity-70 animate-pulse">
          Loading amazing heart facts...
        </div>
      ) : (
        currentFact && (
          <div className={`transition-opacity duration-500 flex-1 ${fade ? "opacity-100" : "opacity-0"}`}>
            {/* Fact */}
            <p className="text-lg font-semibold leading-snug mb-4">{currentFact.fact}</p>

            {/* Boxed Tip */}
            {currentFact.tip && (
              <div className="bg-white bg-opacity-20 p-4 rounded-lg text-purple-50 italic shadow-inner">
                {currentFact.tip}
              </div>
            )}
          </div>
        )
      )}

      {/* Punchline */}
      <p className="mt-4 text-sm text-purple-200 border-t border-purple-300 pt-2 text-center">
        🛍️ Take care of your heart, it's not available on Meesho!
      </p>
    </div>
  );
}

export default DidYouKnow;

