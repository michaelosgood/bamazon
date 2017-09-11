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
    makeTable();
})

var makeTable = function(){
    connection.query("SELECT * FROM products", function(err,res){
        for (var i=0;i<res.length;i++){
            console.log(
                res[i].item_id + " || PRODUCT: " + 
                res[i].product_name  + " || DEPARTMENT: " + 
                res[i].department_name + " || PRICE: $" + 
                res[i].price + " || STOCK: " + 
                res[i].stock_quantity + "\n"
            );
        }
    promptCustomer(res);
    })
}
var promptCustomer = function(res){
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: "What would you like to purchase? [Quit with Q]"
    }]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exit();
        }
        for(var i=0;i<res.length;i++){
            if(res[i].product_name===answer.choice){ //verifies that choice is a product
                correct=true;
                var product=answer.choice; //variable to store answer
                var id = i; //variable to store id of item
                inquirer.prompt({
                    type:"input",
                    name: "quantity",
                    message: "How many would you like to buy?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].stock_quantity-answer.quantity)>0){
                        connection.query("UPDATE products SET stock_quantity='"+
                        (res[id].stock_quantity-answer.quantity)
                        +"'WHERE product_name='"+product+"'",function(err,res2){
                            console.log("Product Purchased!");
                            makeTable();
                        })
                    } 
                    else {
                        console.log("Not a valid selection!");
                        promptCustomer(res);
                    }
                })
            }
        }
        if(i==res.length && correct==false){
            console.log("Not a valid selection!");
            promptCustomer(res);
        }
    })
}