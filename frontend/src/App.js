import React, { useState } from "react";
import "./App.css";
import LoadingSteps from "./LoadingSteps";

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Vercel ENV se API URL lena
  const API_URL = process.env.REACT_APP_API_URL;

  const searchProducts = async () => {
    try {
      setError("");
      setLoading(true);

      // ✅ safety: agar ENV missing ho
      if (!API_URL) {
        throw new Error("API_URL missing");
      }

      const res = await fetch(`${API_URL}/api/search?q=${query}`);

      if (!res.ok) {
        throw new Error("API not responding");
      }

      const data = await res.json();
      setProducts(data.products || []);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("❌ Backend not connected");
    }
  };

  return (
    <div className="page">
      {loading && <LoadingSteps />}

      <div className="glass-card">
        <h1 className="title">
          WiseBuy <span>🔎</span>
        </h1>
        <p className="subtitle">Smart product comparison for better buying decisions</p>

        <div className="search-box">
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search product..."
          />

          <button className="btn" onClick={searchProducts}>
            Search
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {products.length > 0 && (
          <div className="results">
            <h2 className="best-deals">Best deals for you</h2>

            {products.map((p, idx) => (
              <div className="product-card" key={idx}>
                <p className="category">{p.category}</p>
                <h3 className="name">{p.name}</h3>
                <p className="price">₹{p.price}</p>
                <p className="highlight">⭐ {p.highlight}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
