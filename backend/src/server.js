const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Home route
app.get("/", (req, res) => {
  res.send("✅ WiseBuy Backend Running");
});

// ✅ Search API
app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  // ✅ Dummy dataset
  const db = {
    mobile: [
      {
        category: "Mobile",
        name: "iPhone 15",
        price: 79999,
        highlight: "Best camera & long-term updates",
      },
      {
        category: "Mobile",
        name: "iPhone 15 Plus",
        price: 89999,
        highlight: "Bigger display & battery life",
      },
    ],

    laptop: [
      {
        category: "Laptop",
        name: "HP Pavilion",
        price: 62999,
        highlight: "Best for students & coding",
      },
      {
        category: "Laptop",
        name: "Dell Inspiron",
        price: 58499,
        highlight: "Good performance for daily work",
      },
    ],

    ac: [
      {
        category: "AC",
        name: "LG 1.5 Ton AC",
        price: 38999,
        highlight: "Fast cooling & energy efficient",
      },
      {
        category: "AC",
        name: "Samsung Inverter AC",
        price: 41999,
        highlight: "Inverter tech + low electricity bill",
      },
    ],
  };

  let products = [];

  // ✅ Smart query handling
  if (q.includes("mobile") || q.includes("phone") || q.includes("iphone"))
    products = db.mobile;
  else if (q.includes("laptop") || q.includes("hp") || q.includes("dell"))
    products = db.laptop;
  else if (q.includes("ac") || q.includes("air"))
    products = db.ac;
  else products = db.mobile; // default

  res.json({
    success: true,
    query: q,
    products,
  });
});

// ✅ Dynamic PORT (Deploy ready)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("✅ Backend running on port", PORT));