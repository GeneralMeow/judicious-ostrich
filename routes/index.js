const express = require('express');
const router = express.Router();
const path = require('path')
// const { getAllItems } = require('')

const db = require('../database')

router.get('/', function(req, res, next) {
  db.getAllItems()
  .then( todo => {
    res.render('index', { todo })
  })

});

module.exports = router;
