const promise = require( 'bluebird' )
const options = { promiseLib: promise }
const pgp = require( 'pg-promise' )( options )
const CONNECTION_STRING = `pg://${process.env.USER}@localhost:5432/judicious-ostrich-db`
const db = pgp( CONNECTION_STRING )

const getAllItems = () =>
  db.any( "SELECT * FROM item ORDER BY list_order" )

const addItems = task =>
  db.oneOrNone( "INSERT INTO item (task) VALUES ($1)", [ task ])

const removeTask = ids =>
  db.manyOrNone( "DELETE FROM item WHERE id IN ($1:csv)", [ ids ])  
module.exports = { getAllItems, addItems, removeTask }
