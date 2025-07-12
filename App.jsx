import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

function App() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(4);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("beerHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [muted, setMuted] = useState(false);
  const [message, setMessage] = useState("Statystyki Mariana 🍻");

  useEffect(() => {
    localStorage.setItem("beerHistory", JSON.stringify(history));
  }, [history]);

  const addBeer = () => {
    const newEntry = {
      date: new Date().toISOString(),
      price,
      count: 1,
    };
    setHistory([newEntry, ...history]);
    setCount(count + 1);
    if (!muted) new Audio("/sound.mp3").play();
  };

  const exportCSV = () => {
    const header = "Data,Ilość,Cena\n";
    const rows = history
      .map((h) => `${h.date},${h.count},${h.price}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "licznik_piwa.csv");
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">{message}</h1>
      <button
        onClick={addBeer}
        className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow"
      >
        +1 Piwo 🍺
      </button>
      <div className="mt-4">Łącznie: {history.length} piw</div>
      <button
        onClick={exportCSV}
        className="mt-4 text-blue-600 underline"
      >
        Eksportuj do CSV
      </button>
      <div className="mt-4">
        <label>
          Cena: <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="border px-2 py-1 rounded" /> zł
        </label>
      </div>
      <div className="mt-2">
        <label>
          Wyciszenie dźwięku:
          <input type="checkbox" checked={muted} onChange={() => setMuted(!muted)} className="ml-2" />
        </label>
      </div>
    </div>
  );
}

export default App;
