const sequelize = require("./connection.js");
const express = require("express");
const cors = require("cors");
const router = require("./routers/router");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

const assertDatabaseConnectionOk = async () => {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
  }
};

const start = async () => {
  try {
    await assertDatabaseConnectionOk();
    app.listen(PORT, () => console.log(`Server run on port - ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
