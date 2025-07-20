const express = require("express");
const connectToMongo = require("./db");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// DB Connect    
connectToMongo();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
