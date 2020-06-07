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
var mongoURI = "mongodb+srv://admin:Iamnasir12345@pms-quiz-dfvd6.mongodb.net/mainDB?retryWrites=true&w=majority";
  
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