var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    listProducts();
})

var listProducts = function() {
	var query = 'SELECT * FROM Products';
	connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].ItemID + " || Product: " + res[i].ProductName + " || Price: " + res[i].Price);
        }
    setTimeout(function() {nextAsk();}, 3000);
})

};

var nextAsk = function() {
	connection.query('SELECT * FROM Products', function(err, res) {
	inquirer.prompt([{
		name: "item",
		type: "list",
		message: "Which item number would you like to purchase?",
		choices: function() {
            var chooseID = [];
                for (var i = 0; i < res.length; i++) {
                	console.log(res[i].ItemID)
 					chooseID.push(res[i].ItemID);  }
 					console.log(chooseID);
           return chooseID;
            }
      
	},{
		name: "quantity",
		type: "input",
		message: "How many would you like to purchase?",
		validate: function(value) {
			if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
		}
	}]).then(function(answer){
		if (true) {}
	})
})
};

// choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]


    