var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/topshelf';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE people(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });