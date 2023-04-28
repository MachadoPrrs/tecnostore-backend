/**
 * It takes a function as an argument, and returns a function that calls the argument function, and if
 * it throws an error, it calls the next function with the error.
 * @returns A function that takes in a function and returns a function that takes in req, res, next and
 * returns a function that takes in err and returns next(err)
 */
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    }
}