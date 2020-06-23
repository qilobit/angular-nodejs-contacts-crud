const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config.json');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // TODO: poner host en produccion
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.get('/', (req, res) => res.send('<h2>Contactos crud Api</h2>'));
app.use('/contact', contactRoutes);

mongoose.connect(config.db_url, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(con => {
    
  app.listen(config.app_port, () => {
    console.log(`Server running on port ${ config.app_port }`);
  });

})
.catch(e => {

  console.log('Error connecting to DB');
  console.log(e);

});

