window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

var db = null;

function onError(tx,e){
	alert("Something went wrong :" +e.message);	
}

function onSuccess(tx,r){

}

function openDb(){
	db = openDatabase("shoppingList","1", "shopping list", 1024*1024);
	db.transaction(function(tx){
		tx.executeSql("CREATE TABLE IF NOT EXISTS items (ID INTEGER PRIMARY KEY ASC, item TEXT)", []);
	});
}

function getItems(){
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM items",[], renderItems, onError);
	});

}

function renderItems(tx,rs){
	var output = "";
	var list = document.getElementById("shoppingList")
	for(i=0;i<rs.rows.length;i++){
		var row = rs.rows.item(i)
		output+= "<ons-list-item>" + row.item +
		"<div class= \"right\"> <ons-button> <ons-icon icon> =\"trash\"></ons-icon></ons-button></div>" + "</ons-list-item>";
	}
	list.innerHTML = output;
	
}