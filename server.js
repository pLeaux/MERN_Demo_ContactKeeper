const express = require('express');
const app = express(); 
const path = require ('path');

// apparently not needed any more, as already included in Express; needed to be able to parse "req.body", for example
// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); // init 

// Replacement for body-parser (e.g. to parse "req.body"), already included in Express  
app.use(express.json({ extended: false })); 

const db = require('./config/db');

const PORT = process.env.PORT || 5000;  

// test without routing
// app.get('/', (req, res) => res.send('Hello'));

// connect database 
db.connectDB();

// routing
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/debug', require('./routes/debug'));

// serve static (pre-built) assets in production for all other (local, non /api) routes
if (process.env.NODE_ENV === 'production') {
  console.log('NODE_ENV = production'); 

  // original, not working in widows
  // app.use (express.static('sclient/buid')); 
  // my version, works!
  app.use (express.static(path.join('client', 'build')));  
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))); // __dirname = current
}
 
// start server
app.listen(PORT, () => console.log(`Web server started on port ${PORT}`));