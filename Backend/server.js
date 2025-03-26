// npm install express mongoose cors dotenv
//npm init -y

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");


const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/movies", require("./routes/movieRoutes"));

// Serve React static files from the build folder
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));