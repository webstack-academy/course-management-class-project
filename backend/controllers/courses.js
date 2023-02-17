const { db } = require('../services/db')

exports.createCourse = (req, res) => {
  const { title, description } = req.body;
  
  if (typeof title !== 'string' || title.length < 5 || title.length > 60){
    return res.status(400).send({ message: 'Title must be a string or between 5 and 60 characters' })
  }

  if (typeof description !== 'string' || description.length > 300){
    return res.status(400).send({ message: 'Description must be a string or below 301 characters' })
  }

  db.query('INSERT INTO courses (name, description, creator_id) VALUES (?,?,?)', [title, description, res.locals.user], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Internal Server Error')
    }
    else {
      console.log(result)
      return res.status(201).send({ msg: 'Course created successfully' })
    }
  })
}

exports.getCourses = async (req, res) => {
  try { 
    res.send({ courses: await db.query('SELECT * FROM courses') })
  } catch (e) {
    console.log(e)
    
    res.status(500).send('Internal Server Error')
  }
}