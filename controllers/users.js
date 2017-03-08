const User = require('../models/user');

exports.getAllUsers = function(req, res) {
  User.find({}, function(err, users){
    if(err){
      return res.status(422).send(err)
    }

    res.status(200).send(users)
  })
}


exports.signin = function(req, res) {
  User.findOne({
    id: req.body.id
  }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with id does exits, return user
    if (existingUser) {
    	return res.send({user: existingUser, isNew: true})
    }

    User.create(req.body, function(err, user) {
      if (err) {
        return res.send("error", err)
      }
      res.send({user: user, isNew: true})
    })

  })
}


exports.updateUserArray = function (req, res) {
  const query = {
    id: req.params.id
  }
  const update = {
    $addToSet: {}
  }
  const options = {
    upsert: true,
    new: true
  }

  for (var item in req.body) {
    if (req.body[item]) {
      update.$addToSet[item] = req.body[item]
    }
  }
  User.findOneAndUpdate(query, update, options, function(err, user) {
    if (err) {
      return res.status(422).send(err)
    }
    res.status(200).send(user)
    //res.send(products)
  })
}  

exports.updateUser = function (req, res) {
  const query = {
    id: req.params.id
  }
  var b = req.body 
  const update = {
    $set: req.body
  }
  const options = {
    upsert: true,
    new: true
  }
  console.log(update.$set)
  User.findOneAndUpdate(query, update, options, function(err, user) {
    if (err) {
      return res.status(422).send(err)
    }
    res.status(200).send(user)
    //res.send(products)
  })
} 
