const mysql = require('mysql')

const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
}

const db = mysql.createConnection(config)

db.connect((err)=> {
    if(err){
        console.log(err)
    }else{
        console.log('MySQL Connection Success')
    }
}) 

const createTables = async () => {
    await db.query(`create table if not exists users (
            id int primary key auto_increment,
            username text not null,
            email varchar(100) not null,
            password text not null,
            token text not null
              )`)
await db.query(`create table if not exists courses (
    id int primary key auto_increment not null,
    name varchar(60) not null,
    description varchar(300) , 
    image varchar(200) , creator_id int not null )`)
}


module.exports.createTables = createTables
module.exports.db = db

