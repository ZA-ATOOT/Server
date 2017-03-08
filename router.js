const users = require('./controllers/users');
const Product = require('./controllers/product');

module.exports = function(app){
	// User
	app.get('/users', users.getAllUsers)
	app.post('/signin', users.signin)
	app.put('/user/:id', users.updateUser)
	app.put('/userArray/:id', users.updateUserArray)

	// Product
	app.get('/products', Product.getAllProducts);
	app.get('/products/:sellerId', Product.getOneProduct);
	app.put('/products/:id', Product.editOneProduct);
	app.post('/products',Product.addProduct);
	app.get('/manyProducts', Product.findManyProducts)
}