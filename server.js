const express = require("express");
const app = express();
const http = require("http");
const usersRoutes = require("./backend/route/users");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
console.log("server running");

mongoose
  .connect(
    // "mongodb+srv://aryanbhavsar83:AB161202@cluster0.kwq05cx.mongodb.net/?retryWrites=true&w=majority"
    "mongodb://localhost:27017/task1"
  )
  .then(() => {
    console.log("Connected To Databse!.");
  })
  .catch(() => {
    console.log("Connection failed!.");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/users", usersRoutes);
