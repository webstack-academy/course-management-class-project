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
const {name, email, password, confirm_password} = req.body
console.log(req.body)
console.log(typeof password)

if (typeof password !=="string" || password.length <= 0 ){
    return res.send( {msg: 'empty password'})
}

if(password !== confirm_password){
    return res.send( {msg: 'password do not match'})
} 

if (typeof email!=="string" || !validator.validate(email)){
    return res.send( {msg: 'empty email'})
}

if (typeof name!=="string" || name.length <= 0 ){
    return res.send( {msg: 'empty name'})
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
        
        db.query('INSERT INTO users (name, email, password, token) VALUES (?,?,?,?) ', [name, email, hashedPassword, token], 
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
        return res.send( {msg: 'empty email'})

    }

    if (typeof password !=="string" || password.length <= 0 ){
        return res.send( {msg: 'empty password'})
    }
    const result = db.query('select * from users where email =?', [email],async (error, result) => {
        if (!(await bcrypt.compare(password,result[0].password))){
            return res.status(401).send( {msg: 'Email or Password incorrect'})
        
        }
        
        const token = result[0].token
        return res.send( {msg: 'User Log In Success', token, id: result[0].id})
    
    })

    }
    
  
   
