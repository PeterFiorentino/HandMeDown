var express = require('express');
var router = express.Router();
const db = require('./db');

router.get('/', async (req, res) => {
  try{
    let garments = await db.any(`SELECT * FROM garments;`);
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
          garment: singleGarment
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

  router.post('/user/:user_id', async (req, res) => {
    let user_id = req.params.user_id
    console.log(user_id)
    let garment_name = req.body.garment_name
    let category = req.body.category
    let caption = req.body.caption
    let img_url = req.body.img_url
    let prime_location = req.body.prime_location
    console.log(req.body)
    try {
      let newGarment = await db.one(`INSERT INTO garments(user_id, garment_name, category, caption, img_url, prime_location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [user_id, garment_name, category, caption, img_url, prime_location]);
      res.json({
        message: "Success",
        payload: {
          newGarment: newGarment
        }, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "Could not add new garment",
        payload: null,
        error: error
      })
    }
  });

  router.get('/garment/:user_id', async (req, res)  => {
    try {
      let usersGarments =  await db.any(`SELECT * FROM garments WHERE user_id=$1`, [req.params.user_id]);
      res.json({
        message: "Success",
        payload: usersGarments, 
        error: null
      })
    } catch (error) {
      res.json({
        message: "There was a problem getting that user's garments",
        payload: null,
        error: error
      })
    }
  });
  

module.exports = router;