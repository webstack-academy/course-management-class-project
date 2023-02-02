const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const db = require('../services/db.js')
const validator = require('email-validator')
const crypto = require ('crypto')


exports.register = (req, res) => {
    console.log(req.body)
 /*
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirm_password = req.body.confirm_password
*/
const {name, email, password, confirm_password} = req.body



if (typeof password !=="string" || password.length <= 0 ){
    return res.render('register', {msg: 'empty password'})
}

if(password !== confirm_password){
    return res.render('register', {msg: 'password do not match'})
} 

if (typeof email!=="string" || validator.validate(email)){
    return res.render('register', {msg: 'empty email'})
}

if (typeof name!=="string" || name.length <= 0 ){
    return res.render('register', {msg: 'empty name'})
}



db.query('SELECT email FROM users WHERE email =?', [email], 
  async (error, result) => {
    if(error){
        confirm.log(error)
    }
    if(result.length > 0){
        return res.render('register', {msg: 'email is already Taken'})
    }
    const hashedPassword = await bcrypt.hash(password,8)
    const token = crypto.randomBytes(16).toString('hex')

        db.query('INSERT INTO users (user,email,password,token) VALUES (?,?,?,?)', {name, email, hashedPassword, token},
        (error, result) => { 
            if(error){
                console.log(error)
            
            }else{
                console.log(result)
                return res.send('register', {msg: 'User Registion Success',token, id: result.insertId })
            }
        })
})

}