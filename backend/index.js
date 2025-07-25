const express = require("express");
const connectToMongo = require("./db");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;


connectToMongo();


app.use(
  cors({
    origin: "https://notehere.onrender.com", // frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/notes", require("./routes/notes"));
app.use("/api/auth", require("./routes/auth"));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
