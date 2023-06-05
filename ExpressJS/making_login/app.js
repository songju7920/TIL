const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { sequelize } = require("./model/index");
const router = require("./router/index");
require("dotenv").config();

const corsOptions = {
  origin: "*",
  method: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  Credential: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));

const port = process.env.PORT || 8080;

app.use("/", router);

app.listen(port, () => {
  console.log(`sever is litening on port ${port}`);

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Success to link database!");
    })
    .catch((err) => {
      console.error(err);
    });
});
