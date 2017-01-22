const promise = require( 'bluebird')
const options = { promiseLib: promise }
const pgp = require( 'pg-promise' )( options )
const CONNECTION_STRING = `pg://${process.env.USER}@localhost:5432/judicious-ostrich-db`
const db = pgp( CONNECTION_STRING )

const getAllItems = () =>
  db.any( "SELECT * FROM item ORDER BY list_order" )

const getItem = (id) =>
    db.one( "SELECT * FROM item where id=$1", [id] )

const addItem = task =>
  db.oneOrNone( "INSERT INTO item (task) VALUES ($1)", [ task ])

const removeTask = ids =>
  db.manyOrNone( "DELETE FROM item WHERE id IN ($1:csv)", [ ids ])

const updateItems = ( newTask, id ) =>
  db.oneOrNone( "UPDATE item SET task=$1 WHERE id=$2", [ newTask, id ])

const updateCompletion = (id, completed) =>
  db.none( "UPDATE item SET is_complete=$2 WHERE id=$1", [ id, completed ])

const toggleComplete = (id) => {
  return getItem(id).then(item => {
    return db.none( "UPDATE item SET is_complete=$2 WHERE id=$1", [ id, !item.is_complete ])
  })
}


  module.exports = { getAllItems, addItem, removeTask, updateItems, updateCompletion, toggleComplete }
