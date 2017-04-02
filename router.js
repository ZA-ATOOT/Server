const users = require('./controllers/users');
const Product = require('./controllers/product');
const Search = require('./controllers/search');

module.exports = function(app){
	// User
	app.get('/users', users.getAllUsers)
	app.post('/signin', users.signin)
	app.put('/user/:id', users.updateUser)
	app.put('/addLikeShare/:id', users.addLikeShare)

	// Product
	app.get('/products', Product.getAllProducts);
	app.get('/products/:sellerId', Product.getOneProduct);
	app.put('/products/:id', Product.editOneProduct);
	app.post('/products',Product.addProduct);
	app.get('/findProductsFromArrayOfIds', Product.findProductsFromArrayOfIds);
	app.delete('/removeProduct/:id', Product.findByIdAndRemove)
	
	app.get('/mapReduce', Search.mapReduce)
	app.get('/getAllSearches', Search.getAllSearches)
	app.post('/addToSearch', Search.addToSearch)
}