const express = require('express');
const router = express.Router();
const userQueries = require('../queries/users')
const authHelpers = require('../auth/helpers')
const passport = require('../auth/passport');


router.post("/signup", async (req, res, next) => {
  console.log('body', req.body)

  try {
    const passwordDigest = await authHelpers.hashPassword(req.body.password)

    const userInfo = {
      username: req.body.username,
      email: req.body.email,
      avatar_url: req.body.avatar_url,
      password: passwordDigest,
      isPublic: req.body.isPublic
    }

    let newUser = await userQueries.createNewUser(userInfo)
    res.json({
      payload: newUser,
      msg: "Success adding a new user",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failure adding a new user",
      err: true
    })
  }
})

router.post("/login", passport.authenticate('local'), (req, res, next) => {
  console.log(req.body)
  res.json({
    payload: req.user,
    msg: "User successfully logged in",
    err: false
  })
})

router.get("/logout", authHelpers.loginRequired, (req, res, next) => {
  console.log("log out")
  req.logout()
  res.json({
    payload: null,
    msg: "User logged out successfully",
    err: false
  })
})

router.get("/isUserLoggedIn", authHelpers.loginRequired, (req, res) => {
  res.json({
    payload: req.user,
    msg: "User is logged in. Session active",
    err: false
  })
})

module.exports = router;