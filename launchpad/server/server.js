const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const gallery = require("./galleryRoutes");

const application = express();
const PORT = 3000;

application.use(cors());
application.use(express.json());
application.use(gallery);

application.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
