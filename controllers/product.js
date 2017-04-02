const Product = require('../models/product');
const mongoose = require('mongoose');

exports.getAllProducts = function(req, res, next) {
  Product.find({}, function(err, products) {
    if (err) {
      return res.status(422).send(err)
    }

    res.json(products)
  }).skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))
}

exports.getOneProduct = function(req, res, next) {
  Product.find({
    sellerId: req.params.sellerId
  }, function(err, products) {
    if (err) {
      return res.status(422).send(err)
    }

    res.status(200).json(products)
  })
}

exports.editOneProduct = function(req, res, next) {
  console.log(req.body, req.params.id)
  const query = {
    _id: req.params.id
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
  Product.findOneAndUpdate(query, update, options, function(err, product) {
    if (err) {
      return res.status(422).send(err)
    }
    res.status(200).send(product)
  //res.send(products)
  })
}

exports.addProduct = function(req, res, next) {
  var isEmpty = false;
  var emptyParam = []
  var dataArr = [ "categories", /*"buyerId",*/ "title", "image", "description", "price", "seller", "age", "city", "address"]
  dataArr.map(function(val, index) {
    if (!req.body[val]) {
      isEmpty = true;
      emptyParam.push(val)
    }
  })
  console.log(req.body)

  if (isEmpty) {
    return res.status(422).send({
      error: "required data ( " + emptyParam + " ) are missing"
    })
  }
  //const product = new Product(req.body);

  Product.create(req.body, function(err, products) {
    if (err) {
      return res.send("error", err)
    }

    res.status(200).send(products)
  })
}

exports.findProductsFromArrayOfIds = function(req, res, next) {
  Product.find({
    '_id': {
      $in: req.query.arr
    }
  }, function(err, products) {
    res.status(200).send(products)
  });
}

exports.findByIdAndRemove = function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, function (err, product) {  
    if(err){
      return res.send(err)
    }
    res.send(product);
});
}