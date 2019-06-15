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
  database: process.env.DB_NAME
});
app.get("/expenses", function (request, response) {
  connection.query("SELECT * FROM expenses", function (err, result, fields) {
    if (err) {
      console.log("Error fetching expenses", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({ expenses: result });
    }
  });
 });
 
 app.post("/expenses", function (request, response) {
  const expensesToBeSaved = request.body;
  connection.query('INSERT INTO expenses SET ?', [expensesToBeSaved], function (err, results, fields) {
    if (err) {
      console.log("Error fetching expenses", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        expenses_id: results.insertId
      });
    }
  });
 });

  
  module.exports.handler = serverless(app);