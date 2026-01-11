import { useState } from "react";
import "./App.css";
import LoadingSteps from "./components/LoadingSteps";

export default function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchProducts = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/search?q=${query}`
      );

      const data = await res.json();
      setProducts(data.products);

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
            placeholder="Search mobile, laptop, AC..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={searchProducts}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {products.length > 0 && (
          <>
            <h2 className="best-title">Best deals for you</h2>

            <div className="results">
              {products.map((p, i) => (
                <div className="product-card" key={i}>
                  <div className="tag">{p.category}</div>

                  <h3>{p.name}</h3>
                  <div className="price">₹{p.price.toLocaleString()}</div>

                  <p className="highlight">⭐ {p.highlight}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}