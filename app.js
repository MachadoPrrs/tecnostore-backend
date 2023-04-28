const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compress = require('compression');
const cors = require('cors');
// const fileUpload = require('express-fileupload');

const AppError = require('./utils/appError');
const globarErrorHandler = require('./controllers/errorController');

// const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const cartRouter = require('./routes/carritoRoutes');
const buscarRoute = require('./routes/buscar');

const app = express();
app.use(cors());

console.log(process.env.NODE_ENV);

//* GLOBAL MIDDLEWARES
// security http headers
app.use(helmet());

//dev login
if (process.env.NODE_ENV === 'development') {
  /* A middleware that logs the request information to the console. */
  app.use(morgan('dev'));
}

/* A middleware that parses the body of the request and makes it available on the request object. */
app.use(express.json());

app.use(express.static('public'));

// data sanitization against NoSql query injection
// "email":{"$gt":""},
app.use(mongoSanitize());
// data sanitization against XSS
app.use(xss());

app.use(compress());

// serving static files
app.use(express.static(`${__dirname}/public`));

//* ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/carrito', cartRouter);
app.use('/api/v1/search', buscarRoute);

//* Error handler
/* This is a middleware that catches all requests that don't match any of the routes. It is the last
middleware in the stack. */
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

/* This is a global error handler. It is a middleware that catches all errors that are thrown in the
application. It is the last middleware in the stack. */
app.use(globarErrorHandler);

module.exports = app;
