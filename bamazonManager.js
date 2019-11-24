var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});
function start() {
    inquirer
        .prompt([
            {
                name: "choices",
                type: "list",
                message: "Select an Option",
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
                    break;

                case "Add New Product":
                    newProduct();
                    break;

                default:
                    console.log("invalid input");
            }
        })
}

function viewProducts() {
    var query = "SELECT * FROM products"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(`\n Items available for sale \n`)
        for (var i = 0; i < res.length; i++) {
            console.log(
                ` ID: ${res[i].id} \n Product: ${res[i].product_name} \n Department: ${res[i].department_name} \n Price: $${res[i].price} \n Quantity: ${res[i].stock_quantity} \n`);
        }
        start();
    });


}

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity <= 5"
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(
                ` ID: ${res[i].id} \n Product: ${res[i].product_name} \n Department: ${res[i].department_name} \n Price: $${res[i].price} \n Quantity: ${res[i].stock_quantity} \n`);
        }
        start();
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
                        for (var i = 0; i < res.length; i++) {
                            product_name.push(res[i].product_name);
                        }
                        return product_name;
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
                console.log(chosenName.product_name);
                // console.log(res);
                inquirer
                    .prompt([
                        {
                            name: "choice",
                            type: "input",
                            message: "How many do you want to buy?"
                        }
                    ])
                    .then(function (amount) {
                        // update amount to SQL but want to add amount
                        var addInventory = parseInt(amount.choice) + parseInt(chosenName.stock_quantity);
                        var queryUpdate = `UPDATE products SET stock_quantity= ${addInventory} WHERE id = ${chosenName.id} `;
                        connection.query(queryUpdate, function (err, res) {
                            if (err) throw err;
                            console.log(`\n Item: ${chosenName.product_name} || Total: ${addInventory} \n\n `);
                            start();
                        })

                    })

            })
    })
}

function newProduct() {
    inquirer
        .prompt([
            {
                name: "product_name",
                type: "input",
                message: "Name of item you will like to add?"
            },
            {
                name: "department_name",
                type: "input",
                message: "Name of department?"
            },
            {
                name: "price",
                type: "input",
                message: "How much will you like to sell it for?"
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many will you like to buy?"
            }
        ])
        .then(function(answer) {
            var query = "INSERT INTO products SET ?";
            connection.query(query,
                {
                    product_name: answer.product_name,
                    department_name: answer.department_name,
                    price: answer.price,
                    stock_quantity: answer.stock_quantity,
                    
                },
                function (err, res) {
                if (err) throw err;
                console.log(`\n\nYour item has been succesfully added!\n\n`);
                start();
            })
        })
}
start();
