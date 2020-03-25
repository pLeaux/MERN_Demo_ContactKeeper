// database connection, config + init  

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
 

// connect to db with mongoose (my ver.)
const mongoDB_ConnectURL = config.get('mongoDB_ConnectURL');

console.log('db.js, mongoDB_ConnectURL = ', mongoDB_ConnectURL); 
 
const connectDB =  (() => { 
  conPromise = mongoose.connect(
    mongoDB_ConnectURL, 
    {
      useNewUrlParser: true, 
      useCreateIndex: true,
      useFindAndModify: false 
    }, 
    (err) => {
      if (err) 
        throw(err);
    }
  )  
  .then (() => { 
    console.log ('Databese connection established! DB=' + (mongoose.connection ? mongoose.connection.name : 'null')); 
  })
  .catch ((err) => { 
    console.log('Error trying to coonect to MongoDB: ', err.message); 
  }); 
})

// module.exports = connectDB; 
module.exports = {
  "connectDB" : connectDB, 
  "dbConnection": mongoose.connection 
}
 