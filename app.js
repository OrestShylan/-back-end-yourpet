const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();
const RequestError = require("./helpers/RequestError");

const authRoutes = require("./routes/api/auth");
const petsRouter = require("./routes/api/pets");
const noticesRouter = require("./routes/api/notices");
const friendsRouter = require("./routes/api/friends");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "Otigin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Origin",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next()
});
app.use("/api/users", authRoutes);
app.use("/api/notices", noticesRouter);
app.use("/api/pets", petsRouter);
app.use("/api/friends", friendsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err instanceof RequestError) {
    res.status(err.status).json({ message: err.message });
  } else {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  }
});

module.exports = app;
