var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

connection.connect(function (err, res) {
    if (err) throw err;
    list();
})

function list() {
    var query = "SELECT * FROM products"
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(`\n Items available for sale \n`)
        for (var i = 0; i < res.length; i++) {
            console.log(
                ` ID: ${res[i].id} \n Product: ${res[i].product_name} \n Department: ${res[i].department_name} \n Price: $${res[i].price} \n Quantity: ${res[i].stock_quantity} \n`);
        }
        buy(res);
    })
}

function buy(res) {
    inquirer
        .prompt([
            {
                name: "buy",
                type: "input",
                message: "What item would you like to purchase? (Please input the ID)"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items would you like to purchase?"
            }
        ])
        .then(function (answer) {
            var buyID = answer.buy - 1;
            var buyItem = res[buyID].stock_quantity;
            var stock = answer.quantity
            console.log("stock quantity: " + buyItem);
            console.log("how much I'll like to buy: " + stock)
            switch (true) {

                case (buyItem < stock):
                    console.log("not enough");
                    break;
                
                case (count > stock):
                    fulfill(answer,res);
            }
        })
}

function fulfill(answer, res) {
    
}

