const express = require("express");
const { sequelize } = require("./models");
const dotenv = require("dotenv");

dotenv.config();

const router = require("./router/index");

const app = express();

const port = 8080;

app.use(express.json());
//Querystring
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen("port", () => {
  console.log(`Sever is litening on port ${port}!`);

  //프로미스 알아봐
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`Success to link DataBase!`);
    })
    .catch((err) => {
      console.error(err);
    });
});
