const db = require('../routes/db');

const getUserByUsername = async (username) => {
    console.log('getting user...', username)
	const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [username])
	return user;
}

const createNewUser = async (user) => {
  // let username = req.body.username
  // let email = req.body.email
  // let password = req.body.password
  // let avatar_url = req.body.avatar_url
  // let isPublic = req.body.isPublic
  const insertQuery = `INSERT INTO users (username, email, password, avatar_url, isPublic) VALUES ($1, $2, $3, $4, $5) RETURNING *;`
  await db.one(insertQuery, [user.username, user.email, user.password, user.avatar_url, user.isPublic]);
  
  return true
}

module.exports = { getUserByUsername, createNewUser }