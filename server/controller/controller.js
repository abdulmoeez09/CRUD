var Userdb = require('../model/model')
//create and save new user
exports.create = (req, res) => {
  //validate request

  if (!req.body) {
    res.status(400).send({ message: 'Content cannot be empty!' })
    return
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  })
  //save user into database
  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect('/add-user')
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'An error has occurred while creating user',
      })
    })
}

//retreive and return all users and return single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: 'Not found user with id' + id })
        } else {
          res.send(data)
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: 'Error while retrieving user with id' + id })
      })
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user)
      })
      .catch((err) => {
        res.send({
          message: err.message || 'An error has occurred while retreiving user',
        })
      })
  }
}

//Updating a new identified users

exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to be update can not be empty' })
  }
  const id = req.params.id

  console.log(id)
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot update data ${id}.May be not found` })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error update user information' })
    })
}

//Delete a user with specified user id in the request

exports.delete = (req, res) => {
  const id = req.params.id
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot delete with id ${id}.May be its wrong` })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Could delete user with id=' + id })
    })
}
