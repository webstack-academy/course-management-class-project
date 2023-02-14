const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const { db } = require('../services/db.js')
const validator = require('email-validator')
const crypto = require('crypto') 

exports.register = (req, res) => {
    console.log(req.body)
    
 /*
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirm_password = req.body.confirm_password
*/
const {username, email, password, confirm_password} = req.body
console.log(req.body)
console.log(typeof password)

if (typeof password !=="string" || password.length < 8 ){
    /*return res.send( {msg: 'empty password or too short'})*/
    return res.status(400).send( {msg: 'empty password or too short'})
} 

if (typeof email!=="string" || !validator.validate(email)){
    /*return res.send( {msg: 'empty email or invalid email'})*/
    return res.status(400).send( {msg: 'empty email or invalid email'})
}

if (typeof username!=="string" || username.length <= 3 || username.length >= 13  ){
    /*return res.send( {msg: 'empty username or not between 4 and 12'})*/
    return res.status(400).send( {msg: 'empty username or not between 4 and 12'})
}



db.query('select email from users where email =?', [email], 
  async (error, result) => {
    if(error){
        console.log(error)
    }
    if(result.length >0){
        return res.send( {msg: 'email is already Taken'})
    }
    const hashedPassword = await bcrypt.hash(password,8)
    const token = crypto.randomBytes(16).toString('hex') 
        
        db.query('INSERT INTO users (username, email, password, token) VALUES (?,?,?,?) ', [username, email, hashedPassword, token], 
        (error, result) => { 
            if(error){
                console.log(error)
            
            }else{
                console.log(result)
                return res.send( {msg: 'User Registration Success', token, id: result.insertId}) // result.insertId per ottenere id da INSERT INTO users
            }
        })
})

}


exports.login = async (req, res) => {
    const {email, password} = req.body

    if (typeof email !=="string" || !validator.validate(email)){
        /*return res.send( {msg: 'empty email'})*/
        return res.status(400).send( {msg: 'empty email'})

    }

    if (typeof password !=="string" || password.length <= 0 ){
        /*return res.send( {msg: 'empty password'})*/
        return res.status(400).send( {msg: 'empty password'})
    }
    const result = db.query('select * from users where email =?', [email],async (error, result) => {
        if (!(await bcrypt.compare(password,result[0].password))){
            return res.status(401).send( {msg: 'Email or Password incorrect'})
        
        }
        
        const token = result[0].token
        return res.send( {msg: 'User Log In Success', token, id: result[0].id})
    
    })

    }
    
  
   
