const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");
const PORT = process.env.PORT || 5000;
const app = express();
const http = require("http").Server(app);

const mongo_url =
  process.env.DEV_MODE == "true"
    ? process.env.MONGODB_URL_DEV
    : process.env.MONGODB_URL;

mongoose
  .connect(mongo_url)
  .then(() => console.log("DB connectied to", mongo_url));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//Data sanitization against NOSQL query injection and xss
app.use(mongoSanitize(), xss());

//Prevents parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);


app.use("/api/v1", require("./routes/api-router"));

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
// app.listen(PORT, () => console.log(`The server is running on PORT ${PORT}`));
  