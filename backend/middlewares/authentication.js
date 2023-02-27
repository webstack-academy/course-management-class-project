const { db } = require('../services/db.js')
const crypto = require('crypto')



exports.verifyAuth = (req, res, next) => {
  let token = req.headers.authorization
  if (typeof token !== 'string') {
    return res.status(401).json({
      error: 'No token provided'
    })
  }

  token = token.replace('Bearer ', '').split('_') //token[id, token1, token2]
  if (token.length < 2) {
    return res.status(401).json({
      error: 'Invalid token provided'
    })
  }
  const userId = token.shift()
  const userToken = token.join('_')

  db.query('SELECT token FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: 'Internal server error'
      })
    }
    else {
      if (result.length < 1) {
        return res.status(401).json({
          error: 'User not found'
        })
      }

      if (userToken.length === result[0].token.length && crypto.timingSafeEqual(Buffer.from(userToken), Buffer.from(result[0].token))) {
        res.locals.user = userId
        next()        
      }
    }
  })
}