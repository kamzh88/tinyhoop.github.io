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
                break;

            case "Add to Inventory":
                addInventory();
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
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                ` ID: ${res[i].id} \n Product: ${res[i].product_name} \n Department: ${res[i].department_name} \n Price: $${res[i].price} \n Quantity: ${res[i].stock_quantity} \n`);
        }
    });
}

function addInventory() {
    var query = "SELECT * FROM products"
    connection.query(query, function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "choices",
                    type: "rawlist",
                    message: "Which item would you like to add?",
                    choices: function () {
                        var product_name = [];
                        var product_id = [];
                        for (var i = 0; i < res.length; i++) {
                            product_name.push(res[i].product_name);
                            product_id.push(res[i].product_id);
                        }
                        return product_name;
                        return product_id;
                    }
                }
            ])
            .then(function (answer) {
                var chosenName;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.choices) {
                        chosenName = res[i];
                    }
                }
                console.log(chosenName.id)
                inquirer
                    .prompt([
                        {
                            name: "choice",
                            type: "input",
                            message: "How many do you want to buy?"
                        }
                    ])
                    .then(function (amount) {
                        var queryUpdate = `UPDATE products SET stock_quantity= ${amount.choice} WHERE id = ${chosenName.id} `
                            ;
                        connection.query(queryUpdate, function (err, res) {
                            if (err) throw err;

                        })
                    })
            })

    })


}

