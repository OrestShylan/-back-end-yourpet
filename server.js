const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
