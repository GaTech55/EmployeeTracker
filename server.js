//look at Activity 14 - Two Tables.  Will need to create 14 to 16 functions.  Need 3 different databases

const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");

var connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "Keisha5510",
  database: "top_songsDB",
});

figlet("Employee Manager", function (err, data) {
  if (err) {
    console.log("Issue");
    console.dir(err);
    return;
  }
  console.log(data);
});
