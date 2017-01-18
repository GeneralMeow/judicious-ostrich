const express = require( 'express' );
const router = express.Router();
const path = require( 'path' )
const db = require( '../database' )

router.get( '/', function( req, res, next ) {
  db.getAllItems()
    .then( todoList => {
      res.render( 'index', { todoList, title: 'Best todo app' })
    })
})

router.post( '/', function( req, res, next ) {
  const { item } = req.body
  db.addItems(item).then(() => res.redirect( '/'))
})

router.post( '/delete', function( req, res, next ) {
  const idList = Object.keys(req.body)
  db.removeTask(idList).then(() => res.redirect('/'))
})

module.exports = router;
