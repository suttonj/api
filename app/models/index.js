//var moment = require("moment");
 
var Knex = require("knex")({
	client: "pg",
	connection: {
		host: "localhost",
		user: "",
		password: "",
		database: "topshelf"
	}
});