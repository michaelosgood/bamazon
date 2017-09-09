var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "Boomers11!",
    database: "bamazon_db"
})

connection.connect(function(err, answer){
    if (err) throw err;
    console.log("Connected as ID: " + connection.threadId);
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, { item_id: answer.item_id }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: $" + res[i].price);
        }
        shop();
    });
});

function shop() {
    inquirer.prompt({
        name: "item_id",
        type: "input",
        message: "What is the ID of the product you would like to purchase?",
        validate: function(value){
            if (isNaN(value)==false) {
                return true;
            }
            else {
                return false;
            }
        }
    }).then(function(answer){
        var id = parseFloat(answer.item_id);
        console.log(id);
        checkQuantity();
    })
}


function checkQuantity() {
    inquirer.prompt({
        name: "stock_quantity",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value){
            if (isNaN(value)==false) {
                return true;
            }
            else {
                return false;
            }
        }
     }).then(function(answer){
        var quantity = parseFloat(answer.stock_quantity);
        console.log(quantity);
     })
}

// Still need to get application to verify id and quantity
// Also need to verify that there is enough quantity left
// Need to decrement stock_quantity when purchase is completed and update database
// Need to notify shopper if there is not enough quantity
