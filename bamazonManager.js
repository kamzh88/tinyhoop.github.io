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
            name: "choices",
            type: "list",
            message: "Menu Options",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ])
    .then(function (answer) {

        switch (answer.choices) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                lowInventory();
                console.log("View Low Inventory");
                break;

            case "Add to Inventory":
                console.log("Add to Inventory");
                break;

            case "Add New Product":
                console.log("Add New Product");
                break;

            default:
                console.log("invalid input");
        }
    })

function viewProducts() {
    var query = "SELECT * FROM products"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(`\n Items available for sale \n`)
        for (var i = 0; i < res.length; i++) {
            console.log(
                ` ID: ${res[i].id} \n Product: ${res[i].product_name} \n Department: ${res[i].department_name} \n Price: $${res[i].price} \n Quantity: ${res[i].stock_quantity} \n`);
        }
    });
}

function lowInventory() {
    
    var query = "SELECT * FROM products WHERE stock_quantity <= 5"
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                ` ID: ${res[i].id} \n Product: ${res[i].product_name} \n Department: ${res[i].department_name} \n Price: $${res[i].price} \n Quantity: ${res[i].stock_quantity} \n`);
        }
        
      });
}