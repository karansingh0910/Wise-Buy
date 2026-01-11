const express = require("express");
const app = express();

app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("WiseBuy Backend Running");
});

// SEARCH API
app.get("/api/search", (req, res) => {
  const q = req.query.q || "";

  res.json({
    success: true,
    search: q,
    products: [
      { name: "iPhone 15", price: 79999, platform: "Amazon" },
      { name: "iPhone 15", price: 78999, platform: "Flipkart" }
    ]
  });
});

module.exports = app;