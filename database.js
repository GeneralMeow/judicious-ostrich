const promise = require( 'bluebird' )
const options = {
  promiseLib: promise
}
const pgp = require('pg-promise')(options)
const CONNECTION_STRING = `pg://${process.env.USER}@localhost:5432/judicious-ostrich-db`

const db = pgp(CONNECTION_STRING)


const getAllItems = () =>
  db.any( "SELECT * FROM item ORDER BY list_order" )













module.exports = {
  getAllItems
}
