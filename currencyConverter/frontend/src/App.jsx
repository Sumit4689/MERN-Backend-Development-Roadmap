import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [conversion, setConversion] = useState("");

  useEffect(() => {
    async function getCurrencies() {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json",
        );
        const data = await response.json();

        setCurrencies(data);
      } catch (error) {
        console.log("Error fetching currencies:", error);
      }
    }

    getCurrencies();
  }, []);

  async function handleConvert() {
    try {
      const response = await fetch("http://localhost:9595/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: from,
          to: to,
          amount: amount,
        }),
      });
      const data = await response.json();
      console.log(data["result"]);
      setConversion(data["result"]);
    } catch (error) {
      console.log("Error converting currency:", error);
    }
  }

  return (
    <div className="h-screen grid grid-rows-[10%_90%] overflow-hidden">
      <header className="w-full bg-cyan-800 p-2 flex items-center justify-center">
        <h1 className="text-white font-extrabold text-3xl font-mono text-center">
          Currency Converter
        </h1>
      </header>

      <main className="w-full bg-cyan-100 flex items-center justify-center overflow-hidden">
        <div className="bg-cyan-50 rounded-2xl shadow-lg p-8 flex-col">
          <div className="flex">
            <div className="flex gap-6 p-4 flex-col">
              <select
                name="fromCurrency"
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border rounded px-3 py-2 bg-white"
              >
                <option value="">Select Currency</option>
                {Object.entries(currencies).map(([code, name]) => (
                  <option key={code} value={code}>
                    {code.toUpperCase()} - {name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded px-3 py-2 bg-white"
              />
            </div>

            <div className="flex gap-6 p-4 flex-col">
              <select
                name="toCurrency"
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border rounded px-3 py-2 bg-white"
              >
                <option value="">Select Currency</option>
                {Object.entries(currencies).map(([code, name]) => (
                  <option key={code} value={code}>
                    {code.toUpperCase()} - {name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={conversion}
                readOnly
                className="border rounded px-3 py-2 bg-white"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="border rounded px-4 py-2 bg-cyan-800 text-white cursor-pointer"
              onClick={handleConvert}
            >
              Convert
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
