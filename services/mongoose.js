'use strict'

var mongoose = require('mongoose');


/*
<BLOCK EXPLAINATION>
Attaches event "connected" and "error" event listeners to mongoose connection.
*/

// Add Connection Event Listener:
mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected')
})

// Add Error Event Listener:
mongoose.connection.on('error', (err) => {
    console.log(`Could not connect to MongoDB because of ${err}`)
    process.exit(1)
})

/*
<<<<< EXPORT FUNCTIONS >>>>>
*/

/**
* Connects with mongodb and returns connection object.
*/
exports.connect = () => {
    // Variables:
    var mongoURI = process.env.MONGOURI;

    // Connect With Mongoose:
    mongoose.connect(mongoURI, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    // Set Mongoose Options:
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true)

    // Return Mongoose Connection Object
    return mongoose.connection
}

//gracefully close the database connection on process end
const shutDownDatabaseConnection = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Database Connection Closed. ${msg}`);
    callback();
  });
};

// handle process events for database connection
// for nodemon restart signal
process.once('SIGUSR2', () => {
  shutDownDatabaseConnection('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// application termination
process.on('SIGINT', () => {
  shutDownDatabaseConnection('application terminated', () => {
    process.exit(0);
  });
});

// for heroku application termination
process.on('SIGTERM', () => {
  shutDownDatabaseConnection('Heroku application termination', () => {
    process.exit(0);
  });
});
