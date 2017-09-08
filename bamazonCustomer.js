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
        name: "ID",
        type: "input",
        message: "What is the ID of the product you would like to purchase?",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    },{

    }).then(function(answer){
        console.log(answer);
        console.log("congrats, you dit it")
    })
}

