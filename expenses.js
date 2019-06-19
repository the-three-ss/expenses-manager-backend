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
  database: "expenses"
});
app.get("/expenses", function (request, response) {
  connection.query("SELECT * FROM Expenses", function (err, result, fields) {
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
  connection.query('INSERT INTO Expenses SET ?', [expensesToBeSaved], function (err, results, fields) {
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

 app.delete("/expenses/:id",function(request,response){
  const eId = request.params.id; 
  connection.query("DELETE FROM Expenses WHERE expenses_id = ?",[eId],function(err,result,fields){
    if(err !== null) {
      console.log("something went wrond deleting the task",err );
      response.send(500);
    } else {
    response.send("Item Deleted");
    }
  });  
});

app.put("/expenses/:id", function (request, response) {
  const updatedExpense = request.params.id;
  const updateExpenseDesc = request.body;
  connection.query('UPDATE Expenses SET expenses_name = ? WHERE expenses_id = ?', [updateExpenseDesc.expenses_name, updatedExpense], function (err, results, fields) {
    if (err) {
      console.log("Error fetching Expenses", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.send("Expenses Updated");
    }
  });
 });

  module.exports.handler = serverless(app);