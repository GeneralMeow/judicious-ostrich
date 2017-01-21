const express = require( 'express' );
const router = express.Router();
const path = require( 'path' )
const db = require( '../database' )

router.get( '/', function( req, res, next ) {
  db.getAllItems()
    .then( todoList => {
      res.render( 'index', { todoList, title: 'Docket' })
    })
})

router.post( '/', function( req, res, next ) {
  const { item } = req.body
  db.addItem(item)
    .then(() => res.redirect( '/'))
})

router.post( '/delete', function( req, res, next ) {
  const {idList} = req.body
  console.log('idList', idList)
  db.removeTask(idList)
    .then(() => res.redirect('/'))
})

router.post( '/edit', function( req, res, next ) {
  console.log('edit');
  const id = req.body.id
  const newTask = req.body.newToDo
  db.updateItems(newTask, id)
    .then(() => res.redirect('/'))
})

router.post( '/toggle_complete', (request, response) => {
  const id = request.body.itemId
  const completed = request.body.completed
  console.log("id: ", id, " completed: ", completed)
  db.toggleComplete(id)
    .then( result => response.json({ message: `${id} completed` }) )
})

module.exports = router;
