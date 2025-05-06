const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const users = require("./userRoutes");
const multer = require("multer");
const upload = multer();
const application = express();
const PORT = 3000;

application.use(
  cors({
    origin: "'https://LEWISBIRCH2.github.io'",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);
application.use(express.json());
application.use(upload.any());
application.use(users);

application.listen(PORT, () => {
  connect.connectToServer();
  // console.log(`Server is running on port ${PORT}`);
});
