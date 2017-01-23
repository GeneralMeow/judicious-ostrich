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
  db.removeTask(idList)
    .then(() => res.redirect('/'))
})

router.post( '/:id', function( req, res, next ) {
  const id = req.params.id
  const newTask = req.body.item
  db.updateItems(newTask, id)
    .then(() => res.redirect('/'))
})

router.post('/rearrange', function( request, response, next){

  db.rearrangeItems(100, 5)
    .then(() => res.redirect('/'))
})

module.exports = router;
