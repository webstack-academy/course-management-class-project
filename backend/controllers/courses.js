exports.createCourse = (req, res) => {
  const { title, description } = req.body;
  
  if (typeof title !== 'string' || title.length < 5 || title.length > 60){
    return res.status(400).send({ message: 'Title must be a string or between 5 and 60 characters' })
  }

  if (typeof description !== 'string' || description.length > 300){
    return res.status(400).send({ message: 'Description must be a string or below 301 characters' })
  }

}

exports.create = (req, res) => {
    return res.send('connected')
}