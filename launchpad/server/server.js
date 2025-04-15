const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const gallery = require("./galleryRoutes");
const users = require("./userRoutes");

const application = express();
const PORT = 3000;

application.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
application.use(express.json());
application.use(gallery);
application.use(users);

application.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
