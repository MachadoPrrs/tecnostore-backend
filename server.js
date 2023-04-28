const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

/* A global event handler for uncaught exceptions. */
process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    process.exit(1);
});


dotenv.config({ path: './config.env' });
const app = require('./app');


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then((con) => {
    con.connections;
    console.log('DB connection successful.'.cyan.bold.underline);
});


//* SET UP THE SERVER
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow.bold));

//* Handle unhandle rejections
/* A global event handler for unhandled rejections. */
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
});

