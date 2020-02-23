var express = require('express');
var router = express.Router();
const db = require('./db');

router.get('/', async (req, res) => {
  try{
    let garments = await db.any(`SELECT * FROM garments`);
    res.json({
      message: "Success",
      payload: {
        garments: garments
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Had an issue retrieving the garments",
      payload: null,
      error: error
    })
  }  
});

router.get('/:id', async (req, res)  => {
    try {
      let singleGarment =  await db.one(`SELECT * FROM garments WHERE id=$1`, req.params.id);
      res.json({
        message: "Success",
        payload: {
          user: singleGarment
        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "There is no garments with that id",
        payload: null,
        error: error
      })
    }
  });

module.exports = router;