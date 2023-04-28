/* The AppError class is a custom error class that extends the built-in Error class. It has a
constructor that takes a message and a statusCode as arguments. It then calls the parent constructor
with the message, sets the statusCode, sets the status to 'fail' if the statusCode starts with a 4,
sets the isOperational property to true, and captures the stack trace. */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // call parent constructor

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = AppError;