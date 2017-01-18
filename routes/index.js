const express = require('express');
const router = express.Router();
const path = require('path')
const db = require( '../database' )

router.get('/', function(req, res, next) {
  //setting title variable
  db.getAllItems()
    .then(todoList => {
      res.render('index', {todoList, title: 'Best todo app'})
    })
})

module.exports = router;
