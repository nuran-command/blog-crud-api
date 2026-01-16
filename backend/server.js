require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use("/api", require("./routes/blogRoutes"));

app.use(express.static(path.join(__dirname, "../frontend")));



app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));