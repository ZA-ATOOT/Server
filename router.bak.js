const Authentication = require('./controllers/authentication');
const Product = require('./controllers/product');

const passportServices = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
	// User
	app.get('/', requireAuth, function(req, res){
		res.send({ message: 'Super secret code ABC123'})
	})
	app.post('/signin', requireSignin, Authentication.signin)
	app.post('/signup', Authentication.signup)
	// Product
	app.get('/products', Product.getAllProducts);
	app.get('/products/:sellerId', Product.getOneProduct);
	app.put('/products/:id', Product.editOneProduct);
	app.post('/products',Product.addProduct);
}