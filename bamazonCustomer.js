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
            var quantityLeft = buyItem - stock;
            console.log("stock quantity: " + buyItem);
            console.log("how much I'll like to buy: " + stock)
            switch (true) {

                case (buyItem < stock):
                    console.log("Not enough items in stock");
                    break;
                
                case (buyItem >= stock):
                    fulfill(quantityLeft, buyID, res);
                    cost(stock, res, buyID);
            }
        })
}

function fulfill(quantityLeft, buyID, res) {
    var product_name= `${res[buyID].product_name}`
    var query = `UPDATE products SET stock_quantity= ${quantityLeft} WHERE id= ${res[buyID].id}`;
    // console.log(quantityLeft);
    connection.query(query, function (err) {
        if (err) throw err;
        console.log(`${product_name} has ${quantityLeft} left`);
    })
}

function cost(stock, res, buyID){
    var price = res[buyID].price
    var costOfProduct = stock*price
    console.log('Total cost of purchase $' + costOfProduct);
}
