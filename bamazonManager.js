var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

inquirer
    .prompt([
        {
            name: "chocies",
            type: "list",
            message: "Menu Options",
            chocies: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
        }
    ])
    .then(function(answer) {
        if (answer.chocies === "View Products for Sale") {

        }
    })
