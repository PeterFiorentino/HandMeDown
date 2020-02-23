var express = require('express');
var router = express.Router();
const db = require('./db');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try{
    let allUsers = await db.any(`SELECT * FROM users`);
    res.json({
      message: "Success",
      payload: {
        users: allUsers
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Had an issue retrieving the users",
      payload: null,
      error: error
    })
  }
  
});

module.exports = router;
