const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql")
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors());
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: ""
});
app.get("/", function (request, response) {
  });

  app.post("/", function (request, response) {
    
  });

  app.delete("/", function(request, response) {
    const taskId = request.params.id;
    
  });

  app.put("/", function(request, response) {
    
  });

  module.exports.handler = serverless(app);