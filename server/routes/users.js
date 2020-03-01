var express = require('express');
var router = express.Router();
const db = require('./db');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatar_url')
  },
  filename: function (req, file, cb) {
    let name = file.originalname
    cb(null, name)
  }
})

const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res)  => {
  try {
    let singleUser =  await db.one(`SELECT * FROM users WHERE id=$1`, req.params.id);
    res.json({
      message: "Success",
      payload: {
        user: singleUser
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "There is no users with that id",
      payload: null,
      error: error
    })
  }
});


router.post('/', async (req, res) => {
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let avatar_url = req.body.avatar_url
  console.log('avatar', avatar_url)
  let isPublic = req.body.isPublic
  try {
    let newUser = await db.one(`INSERT INTO users(username, email, password, avatar_url, isPublic) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [username, email, password, avatar_url, isPublic]);
    res.json({
      message: "Success",
      payload: {
        newUser: newUser
      }, 
      error: null
    })
  } catch (error) {
    res.json({
      message: "Could not add new user",
      payload: null,
      error: error
    })
  }
});


router.patch('/:id/avatar_url', async (req, res) => {
  try {
      let avatar_url = req.body.avatar_url;
      let id = req.params.id;
      let insertQuery = `UPDATE users SET avatar_url = $1 WHERE id = $2;`;
      await db.none(insertQuery, [avatar_url, id])
      res.json({
          message: `user ${id} updated`,
          payload: null,
          error: null
      });    
  } catch(error) {
      res.json({
        message: `Could not edit user ${id}`,
        payload: null,
        error: error
      });
  }
})
router.patch('/:id/username', async (req, res) => {
  try {
      let username = req.body.username;
      let id = req.params.id;
      let insertQuery = `UPDATE users SET username = $1 WHERE id = $2;`;
      await db.none(insertQuery, [username, id])
      res.json({
          message: `user ${id} updated`,
          payload: null,
          error: null
      });    
  } catch(error) {
      res.json({
        message: `Could not edit user ${id}`,
        payload: null,
        error: error
      });
  }
})
router.patch('/:id/email', async (req, res) => {
  try {
      let email = req.body.email;
      let id = req.params.id;
      let insertQuery = `UPDATE users SET email = $1 WHERE id = $2;`;
      await db.none(insertQuery, [email, id])
      res.json({
          message: `user ${id} updated`,
          payload: null,
          error: null
      });    
  } catch(error) {
      res.json({
        message: `Could not edit user ${id}`,
        payload: null,
        error: error
      });
  }
})
router.patch('/:id/password', async (req, res) => {
  try {
      let password = req.body.password;
      let id = req.params.id;
      let insertQuery = `UPDATE users SET password = $1 WHERE id = $2;`;
      await db.none(insertQuery, [password, id])
      res.json({
          message: `user ${id} updated`,
          payload: null,
          error: null
      });    
  } catch(error) {
      res.json({
        message: `Could not edit user ${id}`,
        payload: null,
        error: error
      });
  }
})

router.delete('/:id', async (req, res) => {
  let id = req.params.id
  try{
    let deletedUser = await db.one(`DELETE FROM users WHERE id = $1 RETURNING *;`, id)
    res.json({
      message: "User deleted.",
      payload: deletedUser,
      error: null
    })
  } catch (error) {
    res.json({
      message: `Could not delete user ${id}`,
      payload: null,
      error: error
    });
  }
})



module.exports = router
