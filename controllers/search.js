const Search = require('../models/search');
const Product = require('../models/product');

exports.addToSearch = function(req, res) {
  var s ={
    _id: "test",
    value: {
      a: 1,
      b: 2
    }
  }

Search.create(s, function(err, search) {
    if (err) {
      return res.send("error", err)
    }
    res.status(200).send(search)
  })

}


exports.getAllSearches = function(req, res) {
/*  console.log(req.params)
  Search.find({
    _id: req.params.search
  }, function(err, result) {
    if (err) {
      return res.status(422).send(err)
    }

    res.status(200).send(result)
  })*/
  /*Search.find({
    $text: {
      $search: req.query.text
    }
  }, {
    score: {
      $meta: "textScore"
    }
  }, function(err, result) {
    if (err) {
      return res.status(422).send(err)
    }
    res.status(200).send(result)
  }).sort({
    date: 1,
    score: {
      $meta: "textScore"
    }
  }).skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit))*/

Search.find({}, function(err, searchs) {
    if (err) {
      return res.send(err)
    }

    res.status(200).json(searchs)
  })
}



exports.mapReduce = function(req, res) {
  var o = {};
  o.map = function() {
    // We need to save this in a local var as per scoping problems
    var document = this;

    // You need to expand this according to your needs
    var stopwords = ["the", "this", "and", "or"];

    for (var prop in document) {

      // We are only interested in strings and explicitly not in _id
      /*if (prop === "_id" || prop === "image" || typeof document[prop] !== 'string') {
        continue
      } */     
      if(prop == "categories"){
        document[prop].forEach(function(word) {
          emit(word, document._id)
        })
      }

      if(prop == "otherCategories"){
        document[prop].split(",").forEach(function(word) {
          emit(word, document._id)
        })
      }
      

      /*(document[prop]).trim().replace(/[ ]{2,}/g, " ").split(" ").forEach(function(word) {

        // You might want to adjust this to your needs
        var cleaned = word.replace(/[_+-.,!@#$%^&*();\/|<>"'\\]/g, "")
        if (
          // We neither want stopwords...
          stopwords.indexOf(cleaned) > -1 ||
          // ...nor string which would evaluate to numbers
          !(isNaN(parseInt(cleaned))) ||
          !(isNaN(parseFloat(cleaned))) || 
          cleaned == ""
        ) {
          return
        }
        emit(cleaned, document._id)
      })*/
    }
  }
  o.reduce = function(k, vals) {
    // Kind of ugly, but works.
    // Improvements more than welcome!
    var values = {
      'documents': []
    };
    vals.forEach(function(vs) {
      if (values.documents.indexOf(vs) > -1) {
        return
      }
      values.documents.push(vs)
    }
    )
    return values
  }
  // We need this for two reasons...
  o.finalize = function(key, reducedValue) {

    // First, we ensure that each resulting document
    // has the documents field in order to unify access
    var finalValue = {
      documents: []
    }

    // Second, we ensure that each document is unique in said field
    if (reducedValue.documents) {

      // We filter the existing documents array
      finalValue.documents = reducedValue.documents.filter(function(item, pos, self) {

        // The default return value
        var loc = -1;

        for (var i = 0; i < self.length; i++) {
          // We have to do it this way since indexOf only works with primitives

          if (self[i].valueOf() === item.valueOf()) {
            // We have found the value of the current item...
            loc = i;
            //... so we are done for now
            break
          }
        }

        // If the location we found equals the position of item, they are equal
        // If it isn't equal, we have a duplicate
        return loc === pos;
      }
      );
    } else {
      finalValue.documents.push(reducedValue)
    }
    // We have sanitized our data, now we can return it        
    return finalValue

  }
  o.out = {
    merge: 'searches'
  }
  o.verbose = true;
  Product.mapReduce(o, function(err, results, stats) {
    console.log('map reduce took %d ms', stats.processtime)
    console.log(results)
  })
}