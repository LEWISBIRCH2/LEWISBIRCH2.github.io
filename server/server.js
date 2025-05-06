const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const users = require("./userRoutes");
const multer = require("multer");
const upload = multer();
const application = express();
const PORT = process.env.PORT || 3000;

application.use(
  cors({
    origin: "https://lewisbirch2.github.io",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);
application.use(express.json());
application.use(upload.any());
application.use(users);

application.get("/", (req, res) => {
  res.send("Launchpad backend is running!");
});

connect.connectToServer((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  }

  application.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});